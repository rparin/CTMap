import React, { useEffect } from "react";
import Results from "../Results";
import "./Tabs.css";
import Filters from "../Filters/Filters";

export default function Tabs({
  searchResult,
  setFilter,
  place,
  setPlace,
}: {
  searchResult: {};
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  place: string;
  setPlace: React.Dispatch<React.SetStateAction<string>>;
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
    <>
      <div role="tablist" aria-labelledby="channel-name">
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
          About
        </button>
      </div>
      <div className="px-3 pb-2">
        <div id="tabPanel-1" role="tabpanel" aria-labelledby="tab-1">
          <Filters setFilter={setFilter} place={place} setPlace={setPlace} />
        </div>

        <div id="tabPanel-2" hidden role="tabpanel" aria-labelledby="tab-2">
          <Results searchResult={searchResult} />
        </div>

        <div id="tabPanel-3" hidden role="tabpanel" aria-labelledby="tab-3">
          <p className="text-xs italic">
            <a
              className="font-bold text-sky-500"
              href="https://clinicaltrials.gov"
              title="Information on Clinical Trials and Human Research Studies">
              ClinicalTrials.gov
            </a>{" "}
            provides patients, their family members, and the public with easy
            and free access to information on clinical studies for a wide range
            of diseases and conditions.
          </p>
          <br />
          <p className="text-xs italic">
            ClinicalTrials.gov was developed by the National Library of
            Medicine. ClinicalTrials.gov is updated daily. You should check
            ClinicalTrials.gov frequently for updated information.
          </p>
        </div>
      </div>
    </>
  );
}
