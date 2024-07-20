import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Props = {};

const SelectGender = (props: Props) => {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="" defaultValue={"Male"}/>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Male</SelectItem>
          <SelectItem value="dark">Female</SelectItem>
          <SelectItem value="system">Others</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectGender;