import { useBlogs } from "@/hooks/useBlogs";
import { BlogCard } from "@/components/BlogCard";
import { BlogCardSkeleton } from "@/components/BlogCardSkeleton";
import { AlertCircle } from "lucide-react";

export function BlogList() {
    const { data: blogs, isLoading, error } = useBlogs();

    if (isLoading) {
        return (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <BlogCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-destructive/10 p-4 mb-4">
                    <AlertCircle className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                    Failed to load blogs
                </h3>
                <p className="text-sm text-muted-foreground max-w-md">
                    There was an error fetching the blogs. Please make sure the JSON Server is running on port 3001.
                </p>
            </div>
        );
    }

    if (!blogs || blogs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                    No blogs found
                </h3>
                <p className="text-sm text-muted-foreground">
                    Create your first blog to get started!
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
            ))}
        </div>
    );
}
