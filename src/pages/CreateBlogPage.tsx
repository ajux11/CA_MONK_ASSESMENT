import { Link } from "react-router-dom";
import { CreateBlogForm } from "@/components/CreateBlogForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Newspaper } from "lucide-react";

export function CreateBlogPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <header className="flex items-center gap-4 mb-8">
                    <Link to="/">
                        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Newspaper className="h-6 w-6 text-primary" />
                        <span className="text-lg font-semibold text-foreground">Blog Platform</span>
                    </div>
                </header>

                <main>
                    <CreateBlogForm />
                </main>
            </div>
        </div>
    );
}
