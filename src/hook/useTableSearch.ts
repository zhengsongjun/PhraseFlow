import { useCallback, useEffect, useRef, useState } from 'react';

// 自动提取 TData 类型
type ExtractDataType<T> = T extends (
  ...args: any[]
) => Promise<{ data: Array<infer U>; total: number }>
  ? U
  : any;

export interface UseProTableRequestOptions<
  TSearch,
  TRequest extends (...args: any[]) => any,
> {
  initialParams?: TSearch;
  initialPage?: { pageNum: number; pageSize: number };
  autoTrim?: boolean;
  autoSearch?: boolean;
  debounceDelay?: number;
  requestService: TRequest;
}

function debounce<T extends (...args: any[]) => void>(fn: T, delay = 300) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debouncedFn = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };

  return debouncedFn;
}

export const useProTableRequest = <
  TSearch extends Record<string, any> = Record<string, any>,
  TRequest extends (params: any) => Promise<{ data: any[]; total: number }> = (
    params: any
  ) => Promise<{ data: any[]; total: number }>,
>(
  options: UseProTableRequestOptions<TSearch, TRequest>
) => {
  const {
    initialParams = {} as TSearch,
    initialPage = { pageNum: 1, pageSize: 10 },
    autoTrim = true,
    autoSearch = true,
    debounceDelay = 300,
    requestService,
  } = options;

  type TData = ExtractDataType<TRequest>;

  const [params, setParams] = useState<TSearch>(initialParams);
  const [page, setPage] = useState<{ pageNum: number; pageSize: number }>(
    initialPage
  );
  const [data, setData] = useState<TData[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const formatParams = (input: TSearch): Partial<TSearch> => {
    if (!autoTrim) return input;
    const cleaned: Partial<TSearch> = {};
    Object.entries(input).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        cleaned[key as keyof TSearch] = value;
      }
    });
    return cleaned;
  };

  const fetchData = useCallback(
    async (
      currentParams: TSearch,
      currentPage: { pageNum: number; pageSize: number }
    ) => {
      const cleanedParams = formatParams(currentParams);
      setLoading(true);
      try {
        const requestParmas = { ...cleanedParams, ...currentPage };
        const res = await requestService({ ...requestParmas });
        setData(res.data);
        setTotal(res.total);
        return { data: res.data, total: res.total, success: true };
      } catch (e) {
        setData([]);
        setTotal(0);
        return { data: [], total: 0, success: false };
      } finally {
        setLoading(false);
      }
    },
    [requestService]
  );

  const debounceSearchRef = useRef<(newParams: TSearch) => void>();

  useEffect(() => {
    debounceSearchRef.current = debounce((newParams: TSearch) => {
      const mergedParams = { ...initialParams, ...newParams };
      setParams(mergedParams);
      setPage((prev) => ({ ...prev, pageNum: 1 }));
    }, debounceDelay);
  }, [debounceDelay]);

  const onSearch = (newParams: TSearch) => {
    debounceSearchRef.current?.(newParams);
  };

  const onReset = () => {
    setParams(initialParams);
    setPage(initialPage);
  };

  const onPageChange = (newPage: { pageNum: number; pageSize: number }) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (autoSearch) {
      fetchData(initialParams, initialPage);
    }
  }, []);

  useEffect(() => {
    fetchData(params, page);
  }, [params, page]);

  return {
    params,
    page,
    onSearch,
    onReset,
    onPageChange,
    request: () => fetchData(params, page),
    data,
    total,
    loading,
  };
};
