import React, { useEffect, useState } from "react";
import { MailOutlined, PhoneOutlined, GlobalOutlined } from "@ant-design/icons";
import axios from "axios";
import edit from "../../Icons/edit.png";
import like from "../../Icons/like.png";
import unlike from "../../Icons/unLike.png";
import deleteImg from "../../Icons/delete.png";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import "./Cart.css";

const Cart = () => {
  const [apidata, setApiData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [addBtnCheck, setAddBtnCheck] = useState(false);
  const [editId, setEditId] = useState("");
  const [updateUser, setupdateUser] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    avatar: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setupdateUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const updateUserData = () => {
    setApiData((prevApidata) =>
      prevApidata.map((data) =>
        data._id === editId
          ? {
              ...data,
              name: updateUser.name,
              email: updateUser.email,
              phone: updateUser.phone,
              website: updateUser.website,
              avatar: updateUser.avatar,
            }
          : data
      )
    );

    setIsOpen(false);
  };

  const editHandler = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    setEditId(e.target.id);
    const selectedData = apidata.find((data) => data._id === e.target.id);
    setupdateUser({
      name: selectedData.name,
      email: selectedData.email,
      phone: selectedData.phone,
      website: selectedData.website,
      avatar: selectedData.avatar,
    });
  };

  const deleteHandler = (e) => {
    setApiData((prevApidata) =>
      prevApidata.filter((data) => data._id !== e.target.id)
    );
  };

  const likeHandler = (index) => {
    setApiData((prevApidata) => {
      const updatedApidata = [...prevApidata];
      updatedApidata[index].liked = !updatedApidata[index].liked;
      return updatedApidata;
    });
  };

  const fetchApiData = async () => {
    try {
      const response = await axios.get("https://dummydataapi.onrender.com/");
      const dataWithLiked = response.data.map((obj) => ({
        ...obj,
        liked: false,
      }));
      setApiData(dataWithLiked);
    } catch (error) {
      console.error(error);
    }
  };

  const addDataHandler = () => {
    setAddBtnCheck(true);

    setIsOpen(!isOpen);
    setupdateUser({
      name: "",
      email: "",
      phone: "",
      website: "",
      avatar: "",
    });
  };
  const canclePopUpBtnHandler = () => {
    setIsOpen(!isOpen);
    setAddBtnCheck(false);
  };
  const addUserData = (e) => {
    e.preventDefault();

    const newData = {
      _id: Date.now().toString(),
      name: updateUser.name,
      email: updateUser.email,
      phone: updateUser.phone,
      website: updateUser.website,
      avatar: updateUser.avatar,
    };

    setApiData((prevApidata) => [...prevApidata, newData]);
    setIsOpen(!isOpen);
    setAddBtnCheck(false);
  };

  useEffect(() => {
    fetchApiData();
  }, []);
  console.log(apidata);

  return (
    <>
      {apidata ? (
        <div className="mainDiv">
          <div>
            <button onClick={addDataHandler} className="addBtnData">
              Add Data (Trikl❤️️)
            </button>
          </div>

          <div className="container">
            <div className="row">
              {apidata.map((data, index) => (
                <div key={data._id} className="column">
                  <div className="card">
                    <div>
                      <div>
                        <img alt="" src={data.avatar}></img>
                      </div>
                      <div>
                        <p>{data.name}</p>
                        <div className="commonCLass">
                          <MailOutlined />
                          <p>{data.email}</p>
                        </div>
                        <div className="commonCLass">
                          <PhoneOutlined />
                          <p>{data.phone}</p>
                        </div>
                        <div className="commonCLass">
                          <GlobalOutlined />
                          <p>{data.website}</p>
                        </div>
                      </div>
                      <div className="iconDiv">
                        <img
                          alt=""
                          className="editImg"
                          onClick={() => likeHandler(index)}
                          src={data.liked ? like : unlike}
                        />
                        <div className="slashDiv"></div>
                        <img
                          alt=""
                          id={data._id}
                          className="editImg"
                          src={edit}
                          onClick={editHandler}
                        />
                        <div className="slashDiv"></div>
                        <img
                          alt=""
                          id={data._id}
                          className="editImg"
                          src={deleteImg}
                          onClick={deleteHandler}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {isOpen && (
              <div className="popup-overlay">
                <div>
                  <form
                    onSubmit={
                      addBtnCheck === true ? addUserData : updateUserData
                    }
                  >
                    <div className="popup">
                      <div className="popupChildDiv">
                        <p>Basic Modal </p>
                        <button onClick={() => setIsOpen(!isOpen)}>X</button>
                      </div>
                      <hr />
                      <div className="labelDiv">
                        <div className="label">
                          <label>✶Avatar Link:</label>
                          <label>✶Name:</label>
                          <label>✶Email:</label>
                          <label>✶Phone:</label>
                          <label>✶Website:</label>
                        </div>
                        <div className="inputDiv">
                          <input
                            required
                            onChange={inputHandler}
                            name="avatar"
                            value={updateUser.avatar}
                          />

                          <input
                            required
                            onChange={inputHandler}
                            name="name"
                            value={updateUser.name}
                          />
                          <input
                            value={updateUser.email}
                            required
                            onChange={inputHandler}
                            name="email"
                          />
                          <input
                            value={updateUser.phone}
                            required
                            onChange={inputHandler}
                            name="phone"
                          />
                          <input
                            value={updateUser.website}
                            required
                            onChange={inputHandler}
                            name="website"
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="submitDiv">
                        <button onClick={canclePopUpBtnHandler}>Cancel</button>
                        <button type="submit">
                          {addBtnCheck === true ? "Add Data" : "OK"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default Cart;
