import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./Upload.css";
import axios from "../axios";
import _ from "lodash";
import { useHistory } from "react-router-dom";

const Upload = () => {
  const history = useHistory();
  const [uploadResponse, setUploadResponse] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [hasError, setHasError] = useState(false);

  //handler for upload image event
  const onUpload = async (e) => {
    setDisabled(true);
    let img = _.head(e.target.files);
    let imageData = new FormData();

    imageData.append("file", img);

    setUploadResponse(imageData);
  };

  //handler for submit event
  const onSubmit = async () => {
    let response, requestData = {
      file: uploadResponse,
    };
    setProcessing(true);
    try {
      response = await axios.post("/images/upload",requestData);
      if (!_.isEmpty(response.data)) {
        setProcessing(false);
        setDisabled(false);
        history.push("/");
      }
    } catch (error) {
      setProcessing(false);
      setDisabled(false);
      setHasError(true);
    }
  };
  return (
    <div className="upload">
      <div className="upload__form">
        <input type="file" className="upload__input" onChange={onUpload} />
        <Button
          className="upload__item"
          variant="contained"
          color="primary"
          onClick={onSubmit}
          disabled={!disabled}
        >
          <span>{processing ? <p>Processing</p> : <p>Upload now</p>}</span>
        </Button>
      </div>
      {hasError && <h1 className="upload_error">Image upload failed</h1>}
    </div>
  );
};

export default Upload;
