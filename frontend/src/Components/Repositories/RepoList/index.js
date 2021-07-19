import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import {
  CircularProgress, makeStyles, Modal, Backdrop, Fade,
} from '@material-ui/core';
import {
  FiFolder, FiCode, FiArrowLeft, FiGithub, FiCalendar, FiGlobe,
} from 'react-icons/fi';

import apiGitHub from '../../../apiGitHub';

const Repositories = () => {
  const { user } = useParams();

  const [repos, setRepos] = useState(false);

  useEffect(() => {
    apiGitHub.get(`/users/${user}/repos`).then((res) => {
      const repoArray = [];

      res.data.forEach((element) => {
        repoArray.push(element);
      });

      setRepos(repoArray);
    });
  }, [user]);

  const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    h1: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#000',
    },
    textColor: {
      color: '#000',
      display: 'flex',
      alignItems: 'center',
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [showRepo, setShowRepo] = useState(false);

  const handleOpen = (props) => {
    setOpen(true);

    apiGitHub.get(`/repositories/${props.target.id}`).then((res) => [
      setShowRepo(res.data),
    ]);
  };

  const handleClose = () => {
    setOpen(false);
    setShowRepo();
  };

  const loadRepos = () => {
    if (repos.length === 0) {
      return (
        <div className="centered text-center">
          <h1>There aren't any repositories registered</h1>
        </div>
      );
    }

    if (repos.length > 0) {
      return (
        <div className="scaleContainer">
          <h1 className="text-center">
            {user}
            {' '}
            repositories
          </h1>
          <div className="repoTemplate">
            {repos.map((item, key) => (
              <div key={key} id={item.id} className="repoContainer d-flex justify-content-center" onClick={handleOpen}>
                <FiFolder color="#fff" className="folderIcon" size={20} id={item.id} />
                <div className="d-flex align-items-center justify-content-center" id={item.id}>
                  <strong id={item.id}>{item.name}</strong>
                </div>
                <div className="repoLanguage d-flex align-items-center" id={item.id}>
                  <FiCode color="#fff" size={15} style={{ marginRight: 5 }} id={item.id} />
                  {item.language !== null ? item.language : 'Language not registered'}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    do {
      return (
        <div className="centered">
          <CircularProgress size={40} color="secondary" />
        </div>
      );
    } while (!repos);
  };

  const showRepoContainer = () => {
    if (showRepo) {
      return (
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>

                <h2 className={classes.h1}>
                  <FiFolder color="#000" size={30} style={{ marginRight: 5 }} />
                  {showRepo.name}
                </h2>

                <p className={classes.textColor}>
                  <div className={window.innerWidth < 500 ? 'd-flex flex-wrap flex-column' : ''}>
                    <strong className="d-flex align-items-center">
                      <FiGlobe color="#000" style={{ marginRight: 2 }} />
                      Description:
                          </strong>
                    {showRepo.description ? showRepo.description : 'No descripiton registered'}
                  </div>
                </p>

                <p className={classes.textColor}>
                  <FiCalendar color="#000" style={{ marginRight: 2 }} />
                  <strong>Created at:</strong>
                  {showRepo.created_at ? showRepo.created_at.split('T')[0] : 'Date not registered'}
                </p>

                <p className={classes.textColor}>
                  <FiCode color="#000" size={15} style={{ marginRight: 2 }} />
                  <strong>Language:</strong>
                  {showRepo.language ? showRepo.language : 'Language not registered'}
                </p>

                <p className={classes.textColor}>
                  <strong>Forks:</strong>
                  {showRepo.forks ? showRepo.forks : '0'}
                </p>

                <a href={showRepo.html_url}>
                  <button id="viewOnGitBtn" className="d-flex align-items-center justify-content-center">
                    <FiGithub color="#fff" style={{ marginRight: 5 }} size={25} />
                    View on github
                  </button>
                </a>

              </div>
            </Fade>
          </Modal>
        </div>
      );
    }
  };

  return (
    <>
      <Link to="/search">
        <div className="backArrow d-flex align-items-center">
          <FiArrowLeft size={30} color="#fff" />
          <strong>Back</strong>
        </div>
      </Link>
      {loadRepos()}
      {showRepoContainer()}
    </>
  );
};

export default Repositories;
