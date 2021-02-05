import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Home.css";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import FavoriteBorderTwoToneIcon from "@material-ui/icons/FavoriteBorderTwoTone";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import ThumbUpAltTwoToneIcon from "@material-ui/icons/ThumbUpAltTwoTone";
import ThumbDownTwoToneIcon from "@material-ui/icons/ThumbDownTwoTone";

import _ from "lodash";

import { useHistory } from "react-router-dom";

//styles for grid list and tiles
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    overflow: "hidden",
    marginTop: "1rem",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    height: "100%",
  },
}));

const Home = () => {
  const history = useHistory();
  const classes = useStyles();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isFavorite, setFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(false);
  const [vote, setVotes] = useState(null);
  useEffect(() => {
    const fetchUploadedImages = async () => {
      const response = await axios.get("/images/");
      setUploadedImages(response.data);
    };

    fetchUploadedImages();
    fetchVotes();
    // fetchFavorites();
  }, []);

  //handler for upload event
  const onUpload = () => {
    history.push("/upload");
  };

  //method to fetch votes from the api
  const fetchVotes = async (id, imageid ) => {
    let upVote = [],
      downVote = [];

    const response = await axios.get("/votes");

    response.data.filter((item) => {
        
            if (item.value === 0) {
                downVote.push(item);
              } else if (item.value === 1) {
                upVote.push(item);
              }
        return {downVote,upVote}
    });

    setVotes(upVote.length - downVote.length);
  };

 
//handler for favourite button
  const handleFavorite = async (imageid) => {
    let requestData = {
      image_id: imageid,
    };

    if (!isFavorite) {
      const response = await axios.post("/favourites/", requestData);
      setFavorite(true);
      setFavoriteId(response.data.id);
    } else {
      // if(!_.isEmpty(favoriteId)){
      await axios.delete(`/favourites/${favoriteId}`);
      setFavorite(false);
      setFavoriteId(null);
    }
  };

  //handler for voting event
  const handleVoting = async (imageid, value) => {
    let requestData = {
      image_id: imageid,
      value,
    };
    const response = await axios.post("/votes", requestData);

    if (!_.isEmpty(response.data)) {
     fetchVotes(response.data.id,imageid);
    }
  };

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={4}>
        {uploadedImages.map((tile) => (
          <GridListTile key={tile.id} cols={1}>
            <img src={tile?.url || tile?.image?.url} alt={tile.original_filename} />
            <div className="home__container">
              <GridListTileBar
                title={tile.title}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${tile.title}`}
                    className={classes.icon}
                    value={tile.id}
                  >
                    {!isFavorite ? (
                      <FavoriteBorderTwoToneIcon
                        className="home__favorite"
                        onClick={() => handleFavorite(tile?.id)}
                      />
                    ) : (
                      <FavoriteTwoToneIcon
                        className="home__favorite"
                        onClick={() => handleFavorite(tile?.id)}
                      />
                    )}
                  </IconButton>
                }
              />
              <div className="home__voting">
                <div className="home__votingBtns">
                  <div
                    className="home__votingUp"
                    onClick={() => handleVoting(tile.id, 1)}
                  >
                    <ThumbUpAltTwoToneIcon />
                  </div>
                  <div
                    onClick={() => handleVoting(tile.id, 0)}
                    className="home__votingDown"
                  >
                    <ThumbDownTwoToneIcon />
                  </div>
                </div>
                <div className="home__votes">Cat score: {vote}</div>
              </div>
            </div>
          </GridListTile>
        ))}
      </GridList>

      <div className="home__button">
        <Button
          variant="contained"
          color="primary"
          onClick={onUpload}
        >
          Upload Images
        </Button>
      </div>
    </div>
  );
};

export default Home;
