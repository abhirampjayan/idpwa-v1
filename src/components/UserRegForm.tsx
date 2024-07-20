import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import DatePicker from "./DatePicker";
import SelectGender from "./SelectGender";

type Props = {};

const UserRegForm = (props: Props) => {
  return (
    <div className="">
      <div className="flex flex-col gap-4 ">
        <h2 className="text-2xl">Personal Details</h2>
        <Card className="grid p-8 grid-cols-3 gap-4">
          <div>
            <Label>Full name</Label>
            <Input />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input type="number" maxLength={10} />
          </div>
          <div>
            <Label>WhatsApp Number</Label>
            <Input type="number" maxLength={10} />
          </div>
          <div>
            <Label>Date of Birth</Label>
            <div>
              <DatePicker />
            </div>
          </div>
          <div>
            <Label>Gender</Label>
            <SelectGender />
          </div>
          <div>
            <Label>Father's Name(Optional)</Label>
            <Input />
          </div>
          <div>
            <Label>Mother's Name(Optional)</Label>
            <Input />
          </div>
          <div>
            <Label>Spouse(Optional)</Label>
            <Input />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserRegForm;
