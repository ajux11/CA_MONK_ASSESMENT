import { BlogDetail } from "@/components/BlogDetail";

export function BlogPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <BlogDetail />
            </div>
        </div>
    );
}
