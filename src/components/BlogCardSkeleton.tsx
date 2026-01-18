import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function BlogCardSkeleton() {
    return (
        <Card className="h-full overflow-hidden border-2 border-secondary/50 bg-gradient-to-br from-card to-secondary/20">
            <div className="relative aspect-video overflow-hidden">
                <Skeleton className="h-full w-full" />
            </div>
            <CardHeader className="space-y-3 rounded-t-3xl -mt-8 pt-6">
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-5 w-12 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="pt-0">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
            </CardContent>
        </Card>
    );
}
