import useSWR from "swr";
import ClipLoader from "react-spinners/ClipLoader";
import { Checkbox } from "pretty-checkbox-react";
import { React, useState, useRef, useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import Modal from "react-modal";
import Collected from "./Collected";

const fetcher = (...args) =>
  fetch(...args, { credentials: "include" }).then((res) => res.json());

const Table = () => {
  const [list, setList] = useLocalStorage("list", []);
  const [modalData, setModalData] = useState("");
  const [modal, setModal] = useState(false);
  const listRef = useRef(list);

  useEffect(() => {
    console.log(list);
  }, [list]);
  listRef.current = list;

  const { data, error } = useSWR("/api/data", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <ClipLoader />;
  if (data.error) return <div>There was an error</div>;

  const handleChange = (type, person, state) => {
    console.log(type, person, state);
    if (state === true) {
      setList([...list, type + person]);
    } else {
      setList(list.filter((item) => item !== type + person));
    }
  };

  return (
    <div>
      <Modal
        isOpen={modal}
        contentLabel="Minimal Modal Example"
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <h2>Modal</h2>
        <p>{modalData}</p>
        <button onClick={() => setModal(false)}>close</button>
      </Modal>
      <table border="1" cellPadding="10">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Payment</th>
            <th>Collected</th>
            <th>Morning Trip</th>
            <th>Evening Trip</th>
          </tr>
          {data.map((person, index) => (
            <tr key={person["First Name"] + person["Last Name"]}>
              <td>
                <a
                  onClick={() => {
                    setModalData(
                      person["First Name"] +
                        " " +
                        person["Last Name"] +
                        "\n" +
                        person["Email Address"] +
                        "\n" +
                        person["Phone No."]
                    );
                    setModal(true);
                  }}
                >
                  {person["First Name"] + " " + person["Last Name"]}
                </a>
              </td>
              <td>
                {Collected(
                  person["Payment Received?"],
                  person["Paying by Cash (£7)"]
                )}
              </td>
              <td>
                <Checkbox
                  onChange={(e) => {
                    handleChange(
                      "collected",
                      person["First Name"] + person["Last Name"],
                      e.target.checked
                    );
                  }}
                  // checked if in list
                  checked={listRef.current.includes(
                    "collected" + person["First Name"] + person["Last Name"]
                  )}
                />
              </td>
              <td>
                <Checkbox
                  onChange={(e) => {
                    handleChange(
                      "morning trip",
                      person["First Name"] + person["Last Name"],
                      e.target.checked
                    );
                  }}
                  // checked if in list
                  checked={listRef.current.includes(
                    "morning trip" + person["First Name"] + person["Last Name"]
                  )}
                />
              </td>
              <td>
                <Checkbox
                  onChange={(e) => {
                    handleChange(
                      "evening trip",
                      person["First Name"] + person["Last Name"],
                      e.target.checked
                    );
                  }}
                  // checked if in list
                  checked={listRef.current.includes(
                    "evening trip" + person["First Name"] + person["Last Name"]
                  )}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
