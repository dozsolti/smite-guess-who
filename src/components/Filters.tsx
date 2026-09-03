import { Toggle3, type Toggle3Value } from "../ui/atoms/toggle3";

import allGods from "../gods.json";
import { useFilters, useGod } from "../store";
import Button from "./Button";

function filterToToggle3(
  filterType: "type" | "gender" | "attack_type",
  value: string | null,
): Toggle3Value {
  if (value === null) return "middle";
  if (filterType === "type") return value === "physical" ? "left" : "right";
  if (filterType === "gender") return value === "male" ? "left" : "right";
  if (filterType === "attack_type") return value === "melee" ? "left" : "right";
  return "middle";
}

function toggle3ToFilter(
  filterType: "type" | "gender" | "attack_type",
  value: Toggle3Value,
): "physical" | "magical" | "male" | "female" | "melee" | "ranged" | null {
  if (value === "middle") return null;
  if (filterType === "type") return value === "left" ? "physical" : "magical";
  if (filterType === "gender") return value === "left" ? "male" : "female";
  if (filterType === "attack_type")
    return value === "left" ? "melee" : "ranged";
  return null;
}

export default function Filters() {
  const { choosenGod, hiddenGods, resetHiddenGods } = useGod();
  const { filters, setFilter, resetFilters } = useFilters();

  const filtersAsToggles: {
    type: Toggle3Value;
    gender: Toggle3Value;
    attack_type: Toggle3Value;
  } = {
    type: filterToToggle3("type", filters.type),
    gender: filterToToggle3("gender", filters.gender),
    attack_type: filterToToggle3("attack_type", filters.attack_type),
  };

  const toggle = (key: keyof typeof filtersAsToggles, value: Toggle3Value) => {
    setFilter(key, toggle3ToFilter(key, value));
  };

  const isGodHidden = (god: (typeof allGods)[number]) => {
    if (hiddenGods.has(god.name)) return true;

    if (filters.type && god.type !== filters.type) return true;
    if (filters.gender && god.gender !== filters.gender) return true;
    if (filters.attack_type && god.attack_type !== filters.attack_type)
      return true;

    return false;
  };

  const eliminatedGodsCount = allGods.filter((x) => isGodHidden(x)).length;
  if (!choosenGod) return null;

  return (
    <div className="justify-evenly md:justify-start gap-2 grid grid-cols-2 md:grid-cols-4 mx-auto px-4 md:px-0 container">
      <Toggle3
        value={filtersAsToggles.type}
        onChange={(value) => toggle("type", value)}
        leftLabel="Physical"
        rightLabel="Magical"
      />
      <Toggle3
        value={filtersAsToggles.gender}
        onChange={(value) => toggle("gender", value)}
        leftLabel="Male"
        rightLabel="Female"
      />
      <Toggle3
        value={filtersAsToggles.attack_type}
        onChange={(value) => toggle("attack_type", value)}
        leftLabel="Melee"
        rightLabel="Ranged"
      />
      {eliminatedGodsCount > 0 && (
        <Button
          onClick={() => {
            resetHiddenGods();
            resetFilters();
          }}
          text={`Reset filters (${allGods.length - eliminatedGodsCount} gods)`}
        />
      )}
    </div>
  );
}
