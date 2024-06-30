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
import UploadCover from "./upload-cover";
import MultiSelect from "@/components/ui/multiselect";
import { ActionResponse } from "@/types";
import { Author, Category, Publisher } from "@/db/schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CreateBookForm = ({
  createBook,
  categories,
  publishers,
  authors,
}: {
  createBook: (formData: FormData) => Promise<ActionResponse>;
  categories: Category[];
  publishers: Publisher[];
  authors: Author[];
}) => {
  const router = useRouter();

  return (
    <main className="grid items-start gap-4 px-4 pb-4">
      <form
        className="mx-auto grid flex-1 auto-rows-max gap-4 w-full"
        action={async (formData: FormData) => {
          const createdBook = await createBook(formData);

          console.log({ createdBook });

          if (createdBook.status === "error")
            return toast.error(createdBook.message);

          toast.success(createdBook.message);
          router.push("/feed");
        }}
      >
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl">Cadastrar livro</h1>
          <Button type="submit">Cadastrar</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
              <CardHeader>
                <CardTitle>Detalhes do Livro</CardTitle>
                <CardDescription>
                  Aqui você pode adicionar informações sobre o livro que está
                  sendo cadastrado.
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
                    />
                  </FormItem>
                </FormSection>

                <FormSection className="grid-cols-2">
                  <FormItem>
                    <Label htmlFor="category">Categoria</Label>
                    <Select name="category" required>
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
                    />
                  </FormItem>

                  <FormItem>
                    <Label htmlFor="year">Ano</Label>
                    <Input
                      name="year"
                      type="number"
                      placeholder="Ano"
                      defaultValue="2024"
                      required
                    />
                  </FormItem>

                  <FormItem>
                    <Label htmlFor="copies">Cópias</Label>
                    <Input
                      name="copies"
                      type="number"
                      placeholder="Número de cópias"
                      required
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
                    <Select name="publisher" required>
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
                    <MultiSelect options={authors} name="author" required />
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
                <UploadCover />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateBookForm;
