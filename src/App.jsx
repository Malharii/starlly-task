import React from "react";
import "./App.css";
import Table from "./components/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  UncontrolledDropdown,
} from "reactstrap";
import TableForm from "./components/TableForm";

function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [data, setData] = React.useState([
    {
      id: 1,
      task_name: "Task 1",
      assigned_to: "User 2",
      start_date: new Date(),
      end_date: "2025-10-10",
      tags: ["Tag 1", "Tag 2", "Tag 4", "Tag 5"],
      followers: ["User 3", "User 2"],
      description: "This is description",
    },
    {
      id: 2,
      task_name: "Task 2",
      assigned_to: "User 4",
      start_date: new Date(),
      end_date: "2025-01-01",
      tags: ["Tag 1", "Tag 2"],
      followers: ["User 1", "User 4", "User 5"],
      description: "This is description",
    },
  ]);
  const [editData, setEditData] = React.useState({});

  const handleEditName = (data) => setEditData(data);

  function convertLargeArray(arr, count) {
    let updated = [];
    let index = 0;
    for (let el of arr) {
      if (index >= count) {
        updated.push(`+ ${arr.length - index}`);
        break;
      } else {
        updated.push(el);
      }
      index++;
    }
    return updated;
  }

  function formatDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    // Function to get the correct ordinal suffix for the day
    function getOrdinalSuffix(day) {
      if (day > 3 && day < 21) return "th"; // Special case for 11th, 12th, 13th, etc.
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  }

  const columns = React.useMemo(() => {
    return [
      {
        Header: () => <div>No</div>,
        accessor: "no",
        Cell: (row) => row.row.index + 1,
      },
      {
        Header: () => <div>Task Name</div>,
        accessor: "task_name",
        Cell: ({ row }) => <span className="text-wrap">{row.original.task_name}</span>,
      },
      {
        Header: () => <div>Assigned to</div>,
        accessor: "assigned_to",
      },
      {
        Header: () => <div>Start Date</div>,
        accessor: "start_date",
        Cell: ({ row }) => formatDate(new Date(row.original.start_date)),
      },

      {
        Header: () => <div>End Date</div>,
        accessor: "end_date",
        Cell: ({ row }) => formatDate(new Date(row.original.end_date)),
      },
      {
        Header: () => <div>Tags</div>,
        accessor: "tags",
        Cell: ({ row }) => {
          const updated = convertLargeArray(row.original.tags, 2);
          return updated.map((el) => (
            <span
              title={row.original.tags.join(", ")}
              className="rounded ms-1 px-2 fw-light py-1"
              style={{ background: "#ccc", fontSize: ".9rem" }}
            >
              {el}
            </span>
          ));
        },
      },
      {
        Header: () => <div>Followers</div>,
        accessor: "followers",
        Cell: ({ row }) => {
          const updated = convertLargeArray(row.original.followers, 1);
          return updated.map((el, index) => (
            <span
              title={row.original.followers.join(", ")}
              className="rounded ms-1 px-2 fw-light py-1"
              style={{
                background:
                  index === updated.length - 1 && updated.length !== 1 ? "#ccc" : "white",
                fontSize: ".9rem",
              }}
            >
              {el}
            </span>
          ));
        },
      },
      {
        Header: () => <div>Description</div>,
        accessor: "description",
        Cell: ({ row }) => (
          <span className="text-wrap bg-white text-dark">{row.original.description}</span>
        ),
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <div>
            {editData?.id === row.original.id && (
              <div
                className="d-flex shadow bg-white position-absolute"
                style={{ right: "8%" }}
              >
                <Input
                  style={{ borderRadius: 0 }}
                  defaultValue={editData?.name}
                  onBlur={(e) =>
                    setEditData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                <Button
                  color="danger"
                  size="sm"
                  style={{ borderRadius: 0 }}
                  onClick={() => {
                    setData((prev) => {
                      return prev.map((el) => {
                        if (el.id === editData.id) {
                          el.task_name = editData.name;
                        }
                        return el;
                      });
                    });
                    handleEditName({});
                  }}
                >
                  Save
                </Button>
              </div>
            )}
            <span
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleEditName(
                  row.original.id !== editData.id
                    ? {
                        id: row.original.id,
                        name: row.original.task_name,
                      }
                    : {}
                )
              }
            >
              Edit
            </span>
          </div>
        ),
      },
    ];
  }, [editData]);

  const toggleForm = () => setIsOpen((prev) => !prev);

  return (
    <div className="mt-4 px-3 " id="app">
      <div>
        <Offcanvas toggle={toggleForm} isOpen={isOpen} direction="end">
          <OffcanvasHeader toggle={toggleForm}>
            <span className="fw-bold" style={{ color: "rgba(0, 0, 0, 0.561)" }}>
              Add Data
            </span>
          </OffcanvasHeader>
          <OffcanvasBody>
            <TableForm
              onSave={(data) => {
                setData((prev) => [
                  ...prev,
                  { ...data, id: Math.random(), start_date: new Date() },
                ]);
                setIsOpen(false);
              }}
            />
          </OffcanvasBody>
        </Offcanvas>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3 ">
        <span className="fw-bold fs-4" style={{ color: "rgba(0, 0, 0, 0.561)" }}>
          Task Tabel
        </span>
        <Button color="danger" className="fw-bold mr-5" onClick={toggleForm}>
          Entry new Data
        </Button>
      </div>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
