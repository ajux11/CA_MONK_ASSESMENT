import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBlog } from "@/hooks/useBlogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Send, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function CreateBlogForm() {
    const navigate = useNavigate();
    const { mutate: createBlog, isPending, error } = useCreateBlog();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [categoryInput, setCategoryInput] = useState("");
    const [categories, setCategories] = useState<string[]>([]);

    const handleAddCategory = () => {
        if (categoryInput.trim() && !categories.includes(categoryInput.trim().toUpperCase())) {
            setCategories([...categories, categoryInput.trim().toUpperCase()]);
            setCategoryInput("");
        }
    };

    const handleRemoveCategory = (category: string) => {
        setCategories(categories.filter((c) => c !== category));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddCategory();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        createBlog(
            {
                title,
                description,
                content,
                coverImage: coverImage || "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
                category: categories.length > 0 ? categories : ["GENERAL"],
            },
            {
                onSuccess: () => {
                    navigate("/");
                },
            }
        );
    };

    const isValid = title.trim() && description.trim() && content.trim();

    return (
        <Card className="mx-auto max-w-2xl border-2 border-secondary/50 bg-gradient-to-br from-card to-secondary/10">
            <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Create New Blog
                </CardTitle>
                <CardDescription>
                    Share your thoughts with the world
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            placeholder="Enter blog title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-secondary/30 border-secondary focus:border-primary"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="coverImage">Cover Image URL</Label>
                        <Input
                            id="coverImage"
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            value={coverImage}
                            onChange={(e) => setCoverImage(e.target.value)}
                            className="bg-secondary/30 border-secondary focus:border-primary"
                        />
                        {coverImage && (
                            <div className="mt-2 relative aspect-video overflow-hidden rounded-lg border border-secondary">
                                <img
                                    src={coverImage}
                                    alt="Preview"
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="categories">Categories</Label>
                        <div className="flex gap-2">
                            <Input
                                id="categories"
                                placeholder="Add a category..."
                                value={categoryInput}
                                onChange={(e) => setCategoryInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="bg-secondary/30 border-secondary focus:border-primary"
                            />
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleAddCategory}
                                disabled={!categoryInput.trim()}
                            >
                                Add
                            </Button>
                        </div>
                        {categories.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {categories.map((category) => (
                                    <Badge
                                        key={category}
                                        variant="secondary"
                                        className="bg-primary/20 text-primary border-primary/30 pr-1 cursor-pointer"
                                    >
                                        {category}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveCategory(category)}
                                            className="ml-1 rounded-full hover:bg-primary/30 p-0.5"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Short Description *</Label>
                        <Textarea
                            id="description"
                            placeholder="A brief summary of your blog..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-secondary/30 border-secondary focus:border-primary min-h-[80px]"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Content *</Label>
                        <Textarea
                            id="content"
                            placeholder="Write your blog content here... Use double line breaks for paragraphs."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="bg-secondary/30 border-secondary focus:border-primary min-h-[200px]"
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                            Failed to create blog. Please try again.
                        </div>
                    )}

                    <div className="flex gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate("/")}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={!isValid || isPending}
                            className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 h-4 w-4" />
                                    Publish Blog
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
