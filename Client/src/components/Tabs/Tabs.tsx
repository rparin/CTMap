import React, { MutableRefObject, useEffect } from "react";
import Results from "../Results";
import Filters from "../Filters";
import Lists from "../Lists";
import "./Tabs.css";
import Dropdown from "../Dropdown";
import PageButton from "@/components/PageButton";

export default function Tabs({
  searchResult,
  itemList,
  setFilter,
  place,
  locMarker,
  map,
  setPlace,
  setPageSize,
  pageTokens, // is only read here
  maxPageIndex,
  currentPageIndex,
  setPageToken,
}: {
  searchResult: {};
  itemList: {};
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  place: {} | null;
  locMarker: MutableRefObject<mapboxgl.Marker | null>;
  map: MutableRefObject<mapboxgl.Map | null>;
  setPlace: React.Dispatch<React.SetStateAction<{} | null>>;
  setPageSize: React.Dispatch<React.SetStateAction<string>>;
  pageTokens: MutableRefObject<string[]>;
  maxPageIndex: MutableRefObject<number>;
  currentPageIndex: MutableRefObject<number>;
  setPageToken: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  useEffect(() => {
    const tabsContainer = document.querySelector("[role=tablist]");
    const tabButtons = tabsContainer!.querySelectorAll("[role=tab]");
    const tabPanels = document.querySelectorAll("[role=tabpanel]");

    function switchTab(newTab: any) {
      const activePanelId = newTab.getAttribute("aria-controls");
      const activePanel = tabsContainer!.nextElementSibling!.querySelector(
        "#" + CSS.escape(activePanelId)
      );
      tabButtons.forEach((button) => {
        button.setAttribute("aria-selected", "false");
        button.setAttribute("tabindex", "-1");
      });

      tabPanels.forEach((panel) => {
        panel.setAttribute("hidden", "true");
      });

      activePanel?.removeAttribute("hidden");

      newTab.setAttribute("aria-selected", true);
      newTab.setAttribute("tabindex", "0");
      newTab.focus();
    }
    const clickHandler = (e: any) => {
      const clickedTab = (e.target as HTMLElement).closest("button");
      const currentTab = tabsContainer?.querySelector('[aria-selected="true"]');

      if (!clickedTab || clickedTab === currentTab) return;

      switchTab(clickedTab);
    };
    const keyHandler = (e: any) => {
      switch (e.key) {
        case "ArrowLeft":
          moveLeft();
          break;
        case "ArrowRight":
          moveRight();
          break;
        case "Home":
          e.preventDefault();
          switchTab(tabButtons[0]);
          break;
        case "End":
          e.preventDefault();
          switchTab(tabButtons[tabButtons.length - 1]);
          break;
      }
    };

    tabsContainer!.addEventListener("click", clickHandler);

    tabsContainer!.addEventListener("keydown", keyHandler);

    function moveLeft() {
      const currentTab = document.activeElement;

      if (!currentTab!.previousElementSibling) {
        (tabButtons.item(tabButtons.length - 1) as HTMLElement)?.focus();
      } else {
        (currentTab!.previousElementSibling as HTMLElement)?.focus();
      }
    }

    function moveRight() {
      const currentTab = document.activeElement;
      if (currentTab?.nextElementSibling) {
        (tabButtons.item(0) as HTMLElement)?.focus();
      } else {
        (currentTab!.nextElementSibling as HTMLElement)?.focus();
      }
    }

    return () => {
      tabsContainer?.removeEventListener("click", clickHandler);
      tabsContainer?.removeEventListener("keydown", keyHandler);
    };
  }, []);
  return (
    <section>
      <div className="flex justify-evenly align-center" role="tablist" aria-labelledby="channel-name">
        <button
          id="tab-1"
          role="tab"
          aria-controls="tabPanel-1"
          aria-selected="true">
          Filters
        </button>
        <button
          id="tab-2"
          role="tab"
          aria-controls="tabPanel-2"
          aria-selected="false">
          Results
        </button>
        <button
          id="tab-3"
          role="tab"
          aria-controls="tabPanel-3"
          aria-selected="false">
          List
        </button>
      </div>
      <div className="px-3 pb-2">
        <div id="tabPanel-1" role="tabpanel" aria-labelledby="tab-1">
          <Filters setFilter={setFilter} place={place} setPlace={setPlace} locMarker={locMarker} map={map}/>
        </div>

        <div id="tabPanel-2" hidden role="tabpanel" aria-labelledby="tab-2">
          <Results searchResult={searchResult} />
          <div className="mt-20"></div>
          <div className="flex gap-1 fixed bottom-[4.6rem]">
            <Dropdown
              items={[1, 2, 5, 10, 50]}
              label={"Page Size"}
              setStatus={setPageSize}
              outerStyle="backdrop-blur-md flex items-center p-3 gap-2 bg-blue-400/20 rounded-md mb-2"
              innerStyle="bg-slate-200 border border-slate-200 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2 fixed bottom-[4.5rem] left-[15.5rem] z-50 mb-1">
            <PageButton
              buttonName="Prev"
              pageTokens={pageTokens}
              maxPageIndex={maxPageIndex}
              currentPageIndex={currentPageIndex}
              setPageToken={setPageToken}
              pageDiff={-1}
            />
            <PageButton
              buttonName="Next"
              pageTokens={pageTokens}
              maxPageIndex={maxPageIndex}
              currentPageIndex={currentPageIndex}
              setPageToken={setPageToken}
              pageDiff={1}
            />
          </div>
          <p className="flex fixed bottom-[4.5rem] w-[9rem] left-[15.5rem] text-black z-50 bg-blue-400/20 rounded-md backdrop-blur-md px-3 justify-center">
            {currentPageIndex.current > 0
              ? `Page ${currentPageIndex.current}`
              : ""}
          </p>
        </div>

        <div id="tabPanel-3" hidden role="tabpanel" aria-labelledby="tab-3">
          <Lists itemList={itemList} />
        </div>
        
      </div>
    </section>
  );
}
