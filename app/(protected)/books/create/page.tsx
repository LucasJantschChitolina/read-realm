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
import Image from "next/image";
import { createBook } from "../actions";
import { getPublishers } from "../../publishers/actions";
import { getCategories } from "../../categories/actions";
import { getAuthors } from "../../authors/actions";

import FormItem from "@/components/form-item";
import FormSection from "@/components/form-section";
import UploadCover from "./upload-cover";

const CreateBook = async () => {
  const publishers = await getPublishers();
  const categories = await getCategories();
  const authors = await getAuthors();

  return (
    <main className="grid items-start gap-4 px-4 pb-4">
      <form
        className="mx-auto grid flex-1 auto-rows-max gap-4 w-full"
        action={createBook}
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
                    />
                  </FormItem>
                </FormSection>

                <FormSection className="grid-cols-2">
                  <FormItem>
                    <Label htmlFor="category">Categoria</Label>
                    <Select name="category">
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
                    />
                  </FormItem>

                  <FormItem>
                    <Label htmlFor="year">Ano</Label>
                    <Input
                      name="year"
                      type="number"
                      placeholder="Ano"
                      defaultValue="2024"
                    />
                  </FormItem>

                  <FormItem>
                    <Label htmlFor="copies">Cópias</Label>
                    <Input
                      name="copies"
                      type="number"
                      placeholder="Número de cópias"
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
                    <Select name="publisher">
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
                    <Select name="author">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o autor" />
                      </SelectTrigger>
                      <SelectContent>
                        {authors.map((author) => (
                          <SelectItem key={author.id} value={author.id}>
                            {author.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                {/* <div className="grid gap-2">
                  <Image
                    alt="Product image"
                    className="aspect-[8/10] w-full rounded-md object-cover"
                    height={250}
                    src="https://m.media-amazon.com/images/I/51RfC2gDwuL._SY445_SX342_.jpg"
                    width={250}
                  />
                </div> */}
              </CardContent>
            </Card>
            {/* <Card x-chunk="dashboard-07-chunk-5">
              <CardHeader>
                <CardTitle>Archive Product</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div></div>
                <Button size="sm" variant="secondary">
                  Archive Product
                </Button>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateBook;
