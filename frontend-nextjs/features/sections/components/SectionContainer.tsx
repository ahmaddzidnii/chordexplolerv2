"use client";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";
import { SectionItem } from "./SectionItem";
import { useSongId } from "@/hooks/useSongId";
import { DataRenderer } from "@/components/DataRenderer";
import { useGetSectionsBySongId } from "../hooks/useGetSections";
import { useReorderSection } from "../hooks/useReorderSection";
import { useSelectedListSectionStore } from "../store/useSelectedListSectionStore";
import { EmptyDataFallback } from "@/components/EmptyDataFalback";

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const SectionContainer = () => {
  const songId = useSongId();
  const { data, isLoading, isError } = useGetSectionsBySongId(songId);
  const reordeSection = useReorderSection();
  const queryClient = useQueryClient();
  const { setSections } = useSelectedListSectionStore();

  const [orderedData, setOrderedData] = useState(data?.data ?? []);

  useEffect(() => {
    if (isLoading) return;
    setSections(data?.data ?? []);
    setOrderedData(data?.data ?? []);
  }, [data, isLoading]);

  const handleDragEnd = (result: DropResult<string>) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    // if droppeed in the same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // User move section
    if (type === "section") {
      const items = reorder(orderedData, source.index, destination.index).map((item, index) => ({
        ...item,
        position: index + 1,
      }));

      setOrderedData(items);
      toast.promise(
        reordeSection.mutateAsync(items, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["sections", songId],
            });
          },
        }),
        {
          loading: "Reordering sections",
          success: "Sections reordered successfully",
          error: "Failed to reorder sections",
        }
      );
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId="sections"
        type="section"
        direction="vertical"
      >
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={cn("flex flex-col", data?.data.length! > 0 ? "mt-4" : "mt-0")}
          >
            <DataRenderer
              isError={isError}
              isLoading={isLoading}
              data={orderedData}
              fallback={<EmptyDataFallback />}
              render={(section, index) => {
                return (
                  <SectionItem
                    key={section?.id}
                    data={section}
                    index={index}
                  />
                );
              }}
            />
            {provided.placeholder}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
