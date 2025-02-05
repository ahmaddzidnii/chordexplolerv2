"use client";
import { Button } from "@/components/ui/button";
import { useSectionFormStore } from "../components/store/useSectionForm";
import { SectionContainer } from "../components/SectionContainer";
import SectionForm from "../components/SectionForm";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Skeleton } from "@/components/ui/skeleton";

const data = [
  {
    id: "01jk62kna8sa0ypks1casvv1e8",
    postion: 1,
    name: "Verse 1",
    start_time: 0,
    end_time: 30,
    content: `<p class="row"><span class="c" data-chord="A">
                  <span>A</span>
                </span>Aku <span class="c" data-chord="E/G#">
                  <span>E/G#</span>
                </span>tepat ada di samping<span class="c" data-chord="E">
                  <span>E</span>
                </span>mu</p>
<p class="row">Bertahan, menunggu satunya cintaku</p>
<p class="row">Mengapa dulu kauragukan aku?</p>
<p class="row">Sesali diriku melangkah dengannya</p>`,
  },
  {
    id: "01jk62kna8sa0ypks1casvv1e8s",
    postion: 2,
    name: "Verse 2",
    start_time: 0,
    end_time: 30,
    content: `
<p class="row">Bertahan, menunggu satunya cintaku</p>
<p class="row">Mengapa dulu kauragukan aku?</p>
<p class="row">Sesali diriku melangkah dengannya</p>`,
  },
];
export const SectionView = () => {
  const { isEditing, setEditing, disableEditing } = useSectionFormStore();
  const filteredbyPosition = data.sort((a, b) => a.postion - b.postion);
  return (
    <>
      <div className="space-y-4">
        <div className="sticky top-0 z-10 bg-background border-b py-3">
          <div className="flex items-center justify-between px-4">
            <h1 className="text-xl font-bold">Sections</h1>

            <Button onClick={() => setEditing()}>Add Section</Button>
          </div>
        </div>

        <SectionContainer data={filteredbyPosition} />
      </div>
      <Drawer
        open={isEditing}
        onClose={() => disableEditing()}
      >
        <DrawerContent
          onPointerDownOutside={(e) => e.preventDefault()}
          className="max-w-screen-2xl mx-auto"
        >
          <VisuallyHidden>
            <DrawerHeader>
              <DrawerTitle>Edit Or Create Section</DrawerTitle>
              <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>
          </VisuallyHidden>
          <DrawerFooter>
            <SectionForm />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
