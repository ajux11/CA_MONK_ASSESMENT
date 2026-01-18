import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBlogs, fetchBlogById, createBlog, type CreateBlogInput } from "@/lib/api";

export function useBlogs() {
    return useQuery({
        queryKey: ["blogs"],
        queryFn: fetchBlogs,
    });
}

export function useBlog(id: number) {
    return useQuery({
        queryKey: ["blog", id],
        queryFn: () => fetchBlogById(id),
        enabled: !!id,
    });
}

export function useCreateBlog() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (blog: CreateBlogInput) => createBlog(blog),
        onSuccess: () => {
            // Invalidate blogs query to refetch the list
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });
}
