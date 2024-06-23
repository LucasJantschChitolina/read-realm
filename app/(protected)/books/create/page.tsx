import { createBook } from "../actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import React from "react";
import { getPublishers } from "../../publishers/actions";
import { getCategories } from "../../categories/actions";
import { Textarea } from "@/components/ui/textarea";
import { UploadCover } from "./upload-cover";

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />
));

const FormSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("grid grid-cols-1 gap-4", className)} {...props}>
    {children}
  </div>
));

const CreateBook = async () => {
  const publishers = await getPublishers();
  const categories = await getCategories();

  return (
    <div className="p-4 flex gap-2 flex-col">
      <h1 className="font-bold text-3xl">Adicionar Livro</h1>

      <form action={createBook}>
        <Card className="p-4 flex flex-col gap-4">
          <FormSection className="grid grid-cols-5">
            <FormItem className="col-span-3">
              <Label htmlFor="title">Título</Label>
              <Input
                name="title"
                type="text"
                placeholder="Insira o título do livro"
              />
            </FormItem>

            <FormItem className="col-span-2">
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
          </FormSection>

          <FormSection className="grid grid-cols-4">
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
              <Input name="year" type="number" placeholder="Ano" />
            </FormItem>

            <FormItem>
              <Label htmlFor="edition">Edição</Label>
              <Input
                name="edition"
                type="number"
                placeholder="Número da edição"
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
          </FormSection>

          <FormSection className="grid grid-cols-5">
            <FormItem className="col-span-3">
              <Label htmlFor="summary">Resumo</Label>
              <Textarea
                name="summary"
                className="h-full"
                placeholder="Insira o resumo do livro"
              />
            </FormItem>

            <FormItem className="col-span-2">
              <Label htmlFor="cover">Capa</Label>
              <Input
                name="cover"
                type="url"
                placeholder="Insira a capa do livro"
                className="h-full"
              />
            </FormItem>
          </FormSection>

          <Button type="submit">Create</Button>
        </Card>
      </form>
    </div>
  );
};

export default CreateBook;
