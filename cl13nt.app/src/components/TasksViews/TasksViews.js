import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import { CalendarIcon } from "../Svgs/CalendarIcon";
import { UserIcon } from "../Svgs/UserIcon";
import { PowerIcon } from "../Svgs/PowerIcon";
import { TaskCard } from "../TaskCard/TaskCard";

const TasksViews = (props) => {
  useEffect(() => {
    props.setIsLoaded(false);
  }, []);

  const itemsAdded = [
    { id: uuid(), content: "First task" },
    { id: uuid(), content: "Second Task" },
  ];

  const itemsProgress = [];

  const itemsReview = [];

  const itemsFinished = [];

  const Columns = {
    [uuid()]: {
      name: "Added",
      items: itemsAdded,
    },
    [uuid()]: {
      name: "On Progress",
      items: itemsProgress,
    },
    [uuid()]: {
      name: "On Review",
      items: itemsReview,
    },
    [uuid()]: {
      name: "Done",
      items: itemsFinished,
    },
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const [columns, setColumns] = useState(Columns);

  return (
    <div className="flex flex-col w-full h-screen p-10 rounded-3xl text-gray-700">
      <div className="px-10 mb-7">
        <h1 className="text-4xl font-bold">Staff Tasks</h1>
        <h4 className="text-2xl font-light text-gray-600">
          Check your Tasks or Others Tasks Status.
        </h4>
      </div>
      <div className="grid grid-cols-4 grid-flow-row gap-4 w-full px-10 mt-4 justify-center">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnID, column], index) => {
            return (
              <div
                className="flex flex-col flex-shrink-0 w-full h-max px-4 py-5 rounded-2xl bg-emerald-300 shadow-2xl"
                key={columnID}
              >
                <div className="flex items-center flex-shrink-0 h-10 px-2">
                  <span className="block font-semibold text-lg">
                    {column.name}
                  </span>
                  <span className="flex items-center justify-center w-7 h-7 ml-2 text-base font-semibold text-gray-700 bg-white rounded">
                    {column.items.length}
                  </span>
                  <button className="flex items-center justify-center w-10 h-10 ml-auto text-gray-700 rounded-full hover:bg-white text-3xl font-black">
                    +
                  </button>
                </div>
                <Droppable droppableId={columnID} key={columnID}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        className="flex flex-col pb-2"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <TaskCard
                                    title={item.content}
                                    provided={provided}
                                    id={uuid()}
                                  />
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export { TasksViews };
