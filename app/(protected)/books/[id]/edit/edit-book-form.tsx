"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import FormItem from "@/components/form-item";
import FormSection from "@/components/form-section";
import UploadCover from "../../create/upload-cover";
import MultiSelect from "@/components/ui/multiselect";
import { Author, Book, BookAuthor, Category, Publisher } from "@/db/schema";
import { ActionResponse } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const EditBookForm = ({
  book,
  categories,
  publishers,
  authors,
  bookAuthors,
  updateBook,
}: {
  book: Book;
  categories: Category[];
  publishers: Publisher[];
  authors: Author[];
  bookAuthors: BookAuthor[];
  updateBook: (id: string, formData: FormData) => Promise<ActionResponse>;
}) => {
  const router = useRouter();

  return (
    <main className="grid items-start gap-4 px-4 pb-4">
      <form
        className="mx-auto grid flex-1 auto-rows-max gap-4 w-full"
        action={async (formData: FormData) => {
          const updatedBook = await updateBook(book.id, formData);

          if (updatedBook.status === "error")
            return toast.error(updatedBook.message);

          toast.success(updatedBook.message);
          router.push("/feed");
        }}
      >
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl">Editar livro</h1>
          <Button type="submit">Salvar</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
              <CardHeader>
                <CardTitle>Detalhes do Livro</CardTitle>
                <CardDescription>
                  Aqui você pode editar informações sobre o livro.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormSection className="grid gap-6">
                  <FormItem>
                    <Label htmlFor="title">Título</Label>
                    <Input
                      name="title"
                      type="text"
                      placeholder="Insira o título do livro"
                      required
                      defaultValue={book.title}
                    />
                  </FormItem>
                </FormSection>

                <FormSection className="grid-cols-2">
                  <FormItem>
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      name="category"
                      required
                      defaultValue={book.categoryId}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>

                  <FormItem>
                    <Label htmlFor="edition">Edição</Label>
                    <Input
                      name="edition"
                      type="number"
                      placeholder="Número da edição"
                      required
                      defaultValue={book.edition}
                    />
                  </FormItem>
                </FormSection>

                <FormSection className="grid-cols-3">
                  <FormItem>
                    <Label htmlFor="pages">Páginas</Label>
                    <Input
                      name="pages"
                      type="number"
                      placeholder="Número de páginas"
                      required
                      defaultValue={book.pages}
                    />
                  </FormItem>

                  <FormItem>
                    <Label htmlFor="year">Ano</Label>
                    <Input
                      name="year"
                      type="number"
                      placeholder="Ano"
                      required
                      defaultValue={book.year}
                    />
                  </FormItem>

                  <FormItem>
                    <Label htmlFor="copies">Cópias</Label>
                    <Input
                      name="copies"
                      type="number"
                      placeholder="Número de cópias"
                      required
                      defaultValue={book.copies}
                    />
                  </FormItem>
                </FormSection>

                <FormSection>
                  <FormItem>
                    <Label htmlFor="description">Resumo</Label>
                    <Textarea
                      name="summary"
                      className="min-h-32"
                      placeholder="Insira o resumo do livro"
                      required
                      defaultValue={book.summary}
                      maxLength={255}
                    />
                  </FormItem>
                </FormSection>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-3">
              <CardHeader>
                <CardTitle>Informações da edição</CardTitle>
              </CardHeader>
              <CardContent>
                <FormSection className="grid grid-cols-2">
                  <FormItem>
                    <Label htmlFor="publisher">Editora</Label>
                    <Select
                      name="publisher"
                      required
                      defaultValue={book.publisherId}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione a editora" />
                      </SelectTrigger>
                      <SelectContent>
                        {publishers.map((publisher) => (
                          <SelectItem key={publisher.id} value={publisher.id}>
                            {publisher.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>

                  <FormItem>
                    <Label htmlFor="author">Autor</Label>
                    <MultiSelect
                      required
                      placeholder="Selecione o(s) autor(es)"
                      name="author"
                      options={authors}
                      defaultValue={bookAuthors.map(
                        (author) => author.authorId
                      )}
                    />
                  </FormItem>
                </FormSection>
              </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
              <CardHeader>
                <CardTitle>Capa do Livro</CardTitle>
                <CardDescription>
                  A capa do livro é a primeira impressão que o leitor tem do
                  livro.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UploadCover required defaultValue={book.cover} />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </main>
  );
};

export default EditBookForm;
