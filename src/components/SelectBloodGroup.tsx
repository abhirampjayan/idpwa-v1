import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
type Props = {};

const SelectBloodGroup = (props: Props) => {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="" defaultValue={"Male"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a+">A +ve</SelectItem>
          <SelectItem value="dark">A -ve</SelectItem>
          <SelectItem value="system">B +ve</SelectItem>
          <SelectItem value="dark">B -ve</SelectItem>
          <SelectItem value="system">O +ve</SelectItem>
          <SelectItem value="dark">O -ve</SelectItem>
          <SelectItem value="system">AB +ve</SelectItem>
          <SelectItem value="system">AB -ve</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectBloodGroup;
