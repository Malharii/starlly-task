import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import Select from "react-select";

const tagsOptions = [
  { value: "Tag 1", label: "Tag 1" },
  { value: "Tag 2", label: "Tag 2" },
  { value: "Tag 3", label: "Tag 3" },
  { value: "Tag 4", label: "Tag 4" },
  { value: "Tag 5", label: "Tag 5" },
  { value: "Tag 6", label: "Tag 6" },
];
const usersOptions = [
  { value: "user1", label: "User 1" },
  { value: "user2", label: "User 2" },
  { value: "user3", label: "User 3" },
  { value: "user4", label: "User 4" },
  { value: "user5", label: "User 5" },
  { value: "user6", label: "User 6" },
  { value: "user7", label: "User 7" },
];

function TableForm({ onSave }) {
  const [formData, setFormData] = React.useState({
    task_name: "",
    assigned_to: [],
    end_date: "",
    tags: [],
    followers: [],
    description: "",
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () =>
    onSave({
      ...formData,
      assigned_to: formData.assigned_to.map((ass) => ass.value),
      tags: formData.tags.map((tag) => tag.value),
      followers: formData.followers.map((follower) => follower.value),
    });
  let isFormValid = true;
  if (
    !formData.task_name.trim() ||
    formData.assigned_to.length === 0 ||
    formData.tags.length === 0 ||
    !formData.end_date ||
    formData.followers.length === 0 ||
    !formData.description.trim()
  ) {
    isFormValid = false;
  }

  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="task_name"> Task Name</Label>
          <Input
            className="mb-3"
            id="task_name"
            name="email"
            placeholder="Enter Task Name"
            type="email"
            value={formData.task_name}
            onChange={(e) => handleChange("task_name", e.target.value)}
          />

          <Label for="assigned_to">Assigned To</Label>
          <Select
            className="mb-3"
            options={usersOptions}
            isMulti
            placeholder="Assigned To"
            value={formData.assigned_to}
            onChange={(value) => handleChange("assigned_to", value)}
          />
          <Label for="end_date">End Date</Label>
          <Input
            className="mb-3 py-2"
            bsSize="sm"
            type="date"
            id="end_date"
            value={formData.end_date}
            onChange={(e) => handleChange("end_date", e.target.value)}
          ></Input>
          <Label for="tags">Tags</Label>
          <Select
            className="mb-3"
            isMulti
            options={tagsOptions}
            placeholder="Tags"
            value={formData.tags}
            onChange={(value) => handleChange("tags", value)}
          />

          <Label for="followers">Followers</Label>
          <Select
            className="mb-3"
            isMulti
            options={usersOptions}
            placeholder="Followers"
            value={formData.followers}
            onChange={(value) => handleChange("followers", value)}
          />
          <Label for="description">Description</Label>
          <Input
            className="mb-3"
            name="text"
            type="textarea"
            id="description"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </FormGroup>
      </Form>
      <Button
        color="danger"
        className="float-end px-4 fw-bold"
        onClick={handleSave}
        disabled={!isFormValid}
      >
        Save
      </Button>
    </div>
  );
}

export default TableForm;
