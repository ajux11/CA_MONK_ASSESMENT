import { Link } from "react-router-dom";
import { BlogList } from "@/components/BlogList";
import { Button } from "@/components/ui/button";
import { PlusCircle, Newspaper } from "lucide-react";

export function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                            <Newspaper className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/50 bg-clip-text">
                                Blog Platform
                            </h1>
                            <p className="text-muted-foreground text-sm">
                                Discover interesting stories and insights
                            </p>
                        </div>
                    </div>
                    <Link to="/create">
                        <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create Blog
                        </Button>
                    </Link>
                </header>

                <main>
                    <BlogList />
                </main>

                <footer className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                    <p>Built with TanStack Query, Tailwind CSS & shadcn/ui</p>
                </footer>
            </div>
        </div>
    );
}
