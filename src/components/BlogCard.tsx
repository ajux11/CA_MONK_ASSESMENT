import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Blog } from "@/lib/api";
import { Calendar } from "lucide-react";

interface BlogCardProps {
    blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
    const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <Link to={`/blog/${blog.id}`}>
            <Card className="group h-full overflow-hidden border-2 border-secondary/50 bg-gradient-to-br from-card to-secondary/20 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                <div className="relative aspect-video overflow-hidden">
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                </div>
                <CardHeader className="relative space-y-3 bg-gradient-to-b from-transparent to-card/50 rounded-t-3xl -mt-8 pt-6">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                            {blog.category.slice(0, 2).map((cat) => (
                                <Badge
                                    key={cat}
                                    variant="secondary"
                                    className="bg-primary/20 text-primary border-primary/30 text-xs font-medium"
                                >
                                    {cat}
                                </Badge>
                            ))}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{formattedDate}</span>
                        </div>
                    </div>
                    <h3 className="text-lg font-bold leading-tight tracking-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {blog.title}
                    </h3>
                </CardHeader>
                <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {blog.description}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}
