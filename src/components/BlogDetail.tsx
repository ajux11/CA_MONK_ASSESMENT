import { useParams, Link } from "react-router-dom";
import { useBlog } from "@/hooks/useBlogs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, AlertCircle } from "lucide-react";

export function BlogDetail() {
    const { id } = useParams<{ id: string }>();
    const { data: blog, isLoading, error } = useBlog(Number(id));

    if (isLoading) {
        return <BlogDetailSkeleton />;
    }

    if (error || !blog) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-destructive/10 p-4 mb-4">
                    <AlertCircle className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                    Blog not found
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                    The blog you're looking for doesn't exist or has been removed.
                </p>
                <Link to="/">
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to blogs
                    </Button>
                </Link>
            </div>
        );
    }

    const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <article className="mx-auto max-w-4xl">
            <Link to="/">
                <Button variant="ghost" className="mb-6 -ml-2 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to blogs
                </Button>
            </Link>

            <div className="relative aspect-video overflow-hidden rounded-2xl border-2 border-secondary/50 mb-8">
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>

            <header className="mb-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                    {blog.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                    <div className="flex flex-wrap gap-2">
                        {blog.category.map((cat) => (
                            <Badge
                                key={cat}
                                variant="secondary"
                                className="bg-primary/20 text-primary border-primary/30"
                            >
                                {cat}
                            </Badge>
                        ))}
                    </div>
                    <span className="text-muted-foreground/50">|</span>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formattedDate}</span>
                    </div>
                </div>
            </header>

            <div className="mb-8">
                <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-primary/50 pl-4 italic">
                    {blog.description}
                </p>
            </div>

            <div className="prose prose-invert prose-lg max-w-none">
                {blog.content.split("\n\n").map((paragraph, index) => (
                    <p
                        key={index}
                        className="text-foreground/90 leading-relaxed mb-6"
                    >
                        {paragraph}
                    </p>
                ))}
            </div>

            <footer className="mt-12 pt-8 border-t border-border">
                <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-muted-foreground mr-2">Tags:</span>
                    {blog.category.map((cat) => (
                        <Badge
                            key={cat}
                            variant="outline"
                            className="text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors cursor-pointer"
                        >
                            {cat}
                        </Badge>
                    ))}
                </div>
            </footer>
        </article>
    );
}

function BlogDetailSkeleton() {
    return (
        <div className="mx-auto max-w-4xl">
            <Skeleton className="h-10 w-32 mb-6" />
            <Skeleton className="aspect-video rounded-2xl mb-8" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <div className="flex gap-2 mb-8">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-6 w-5/6 mb-8" />
            <Skeleton className="h-4 w-full mb-3" />
            <Skeleton className="h-4 w-full mb-3" />
            <Skeleton className="h-4 w-4/5 mb-3" />
            <Skeleton className="h-4 w-full mb-3" />
            <Skeleton className="h-4 w-3/4" />
        </div>
    );
}
