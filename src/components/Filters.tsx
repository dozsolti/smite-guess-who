import { useState } from 'react';

import gods from '../gods.json';
import { useGod } from '../store';
import Button from './Button';

export default function Filters() {
  const { choosenGod, hiddenGods, addHiddenGods, removeHiddenGods } = useGod();

  const [togglesHidden, setTogglesHidden] = useState({
    physical: false,
    magical: false,
    males: false,
    females: false,
    melee: false,
    ranged: false,
  });

  const toggle = (key: keyof typeof togglesHidden, gs: typeof gods) => {
    if (!togglesHidden[key]) {
      addHiddenGods(gs);
    } else {
      removeHiddenGods(gs);
    }
    setTogglesHidden((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const hidePhysical = () =>
    toggle(
      "physical",
      gods.filter((god) => god.type === "Physical")
    );
  const hideMagical = () =>
    toggle(
      "magical",
      gods.filter((god) => god.type === "Magical")
    );
  const hideMales = () =>
    toggle(
      "males",
      gods.filter((god) => god.gender === "Male")
    );
  const hideFemales = () =>
    toggle(
      "females",
      gods.filter((god) => god.gender === "Female")
    );
  const hideMelee = () =>
    toggle(
      "melee",
      gods.filter((god) => god.attack_type === "Melee")
    );
  const hideRanged = () =>
    toggle(
      "ranged",
      gods.filter((god) => god.attack_type === "Ranged")
    );

  if (!choosenGod) return null;
  return (
    <div className="justify-evenly md:justify-start gap-2 grid grid-cols-4 md:grid-cols-7 mx-auto px-4 md:px-0 container">
      <Button
        onClick={hidePhysical}
        active={!togglesHidden.physical}
        text={`${togglesHidden.physical ? "" : ""} Physical`}
      />
      <Button
        onClick={hideMagical}
        active={!togglesHidden.magical}
        text={`${togglesHidden.magical ? "" : ""} Magical`}
      />
      <Button
        onClick={hideMales}
        active={!togglesHidden.males}
        text={`${togglesHidden.males ? "" : ""} Male`}
      />
      <Button
        onClick={hideFemales}
        active={!togglesHidden.females}
        text={`${togglesHidden.females ? "" : ""} Female`}
      />
      <Button
        onClick={hideMelee}
        active={!togglesHidden.melee}
        text={`${togglesHidden.melee ? "" : ""} Melee`}
      />
      <Button
        onClick={hideRanged}
        active={!togglesHidden.ranged}
        text={`${togglesHidden.ranged ? "" : ""} Ranged`}
      />

      {hiddenGods.size > 0 && (
        <Button
          onClick={() => {
            removeHiddenGods(gods);
            setTogglesHidden({
              physical: false,
              magical: false,
              males: false,
              females: false,
              melee: false,
              ranged: false,
            });
          }}
          text={`Reset`}
        />
      )}
    </div>
  );
}
