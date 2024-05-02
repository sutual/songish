import {
  PlaylistContainer,
  AboutPlaylist,
  BtnContainer,
  PlaylistInfo,
} from "./components.style";
import { Card, CardSideBack, CardSideFront } from "../amazing_card/components";
import { H0 } from "../../utils/heading.style";
import { Slide, SliderBody, SlidesContainer } from "../slider/components.style";
import { BackIcon, ForwardIcon } from "../music_player/components.style";
import { Paragraph } from "../about/components.style";
import { OutLinedButton } from "../../utils/buttons.style";
import { api } from "../../../services/api";
import { useAppDispatch, useAppSelector } from "../../../utils/customHook";
import { useEffect, useState } from "react";
import {
  ADD_SONG_TO_PLAYLIST,
  SEE_PLAYLIST_SONGS,
  SEE_YOUR_PLAYLIST,
} from "../../../config/constants/user-current-task";
import LoadingSpinner from "../spinner/spinner";
import { setMajorTask } from "../../../store/user/userSlice";
import {
  loadPlaylistSongsRequested,
  setCurrentPlaylist,
} from "../../../store/playlist/playlistSlice";

export const PlaylistCard = () => {
  const playlists = useAppSelector((state) => state.playlists);
  const user = useAppSelector((state) => state.user);
  const [prevIndex, setPrevIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [noPrev, setNoPrev] = useState(true);
  const [noNext, setNoNext] = useState(false);
  const dispatcher = useAppDispatch();
  useEffect(() => {
    handleNextPrev();
  }, [prevIndex, nextIndex]);
  const handleNextPrev = () => {
    if (nextIndex < user.user.my_playlists.length - 1) {
      setNoNext(false);
    } else {
      setNoNext(true);
    }
    if (prevIndex > 0) {
      setNoPrev(false);
    } else {
      setNoPrev(true);
    }
  };
  const nextSlide = () => {
    if (nextIndex + 2 < user.user.my_playlists.length) {
      setNextIndex(nextIndex + 2);
      setPrevIndex(prevIndex + 2);
      console.log(prevIndex, nextIndex);
    } else if (nextIndex + 1 < user.user.my_playlists.length) {
      setNextIndex(nextIndex + 1);
      setPrevIndex(prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (prevIndex - 2 >= 0) {
      setNextIndex(nextIndex - 2);
      setPrevIndex(prevIndex - 2);
      handleNextPrev();
    } else if (prevIndex - 1 >= 0) {
      setNextIndex(nextIndex - 1);
      setPrevIndex(prevIndex - 1);
      handleNextPrev();
    }
  };
  if (user.majorTask !== SEE_YOUR_PLAYLIST) return;
  if (playlists.loading) {
    return <LoadingSpinner />;
  }
  if (!user.user.my_playlists)
    return (
      <>
        <H0>No Playlists Found</H0>
      </>
    );
  return (
    <PlaylistContainer>
      <H0>Your PlayList</H0>
      <SliderBody>
        {!noPrev && <BackIcon onClick={() => prevSlide()} />}
        <SlidesContainer>
          {user.user.my_playlists.map((playlist, index) => {
            if (true) {
              return (
                <Card>
                  <div key={index} style={{ transform: "translateX(34vw)" }}>
                    <Slide
                      key={index}
                      style={{
                        transform: "translateX(" + -nextIndex * 37 + "vw)",
                        transition: "transform 2s ease-out",
                      }}
                    >
                      <AboutPlaylist>
                        <CardSideFront
                          style={{
                            backgroundImage:
                              "linear-gradient(rgba(34, 34, 34, 0.6),rgba(34, 34, 34, 0.6)),url(" +
                              `${api + playlist.image}` +
                              ")",
                            backgroundSize: "cover",
                          }}
                        >
                          <PlaylistInfo>
                            {/* <H1> {playlist.songs.length} </H1> */}
                            <H0> {playlist.name} </H0>
                            <Paragraph style={{ width: "20vw" }}>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Tempora mollitia saepe alias corrupti ut?
                            </Paragraph>
                          </PlaylistInfo>
                        </CardSideFront>
                      </AboutPlaylist>
                      <CardSideBack
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(34, 34, 34, 0.6),rgba(34, 34, 34, 0.6)),url(" +
                            `${api + playlist.image}` +
                            ")",
                          backgroundSize: "cover",
                        }}
                      >
                        <H0
                          style={{
                            fontSize: "40px",
                            marginTop: "4rem",
                          }}
                        >
                          {" "}
                          {user.user.my_playlists[index].song.length} Songs
                        </H0>
                        <BtnContainer>
                          <OutLinedButton
                            style={{
                              color: "#f9f6f8",
                              border: "2px solid #f80bb1",
                              padding: "10px 20px",
                            }}
                            onClick={() => {
                              dispatcher(setMajorTask(SEE_PLAYLIST_SONGS));
                              dispatcher(setCurrentPlaylist(playlist));
                              dispatcher(
                                loadPlaylistSongsRequested({
                                  playlist_id: playlist.id,
                                })
                              );
                            }}
                          >
                            See Musics
                          </OutLinedButton>
                          <OutLinedButton
                            style={{
                              color: "#f9f6f8",
                              border: "2px solid #f80bb1",
                              padding: "10px 20px",
                            }}
                            onClick={() => {
                              dispatcher(setCurrentPlaylist(playlist));
                              dispatcher(setMajorTask(ADD_SONG_TO_PLAYLIST));
                            }}
                          >
                            Add musics
                          </OutLinedButton>
                          <OutLinedButton
                            style={{
                              color: "#f9f6f8",
                              border: "2px solid #f80101",
                              padding: "10px 20px",
                            }}
                          >
                            Delete
                          </OutLinedButton>
                        </BtnContainer>
                      </CardSideBack>
                    </Slide>
                  </div>
                </Card>
              );
            }
          })}
        </SlidesContainer>
        {!noNext && <ForwardIcon onClick={() => nextSlide()} />}
      </SliderBody>
    </PlaylistContainer>
  );
};
