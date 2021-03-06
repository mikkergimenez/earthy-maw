import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import IMusicKey from '../../Types/IMusicKey.ts';
import IMusicScale from '../../Types/IMusicScale.ts';

import MachineDrawer from "./MachineDrawer.tsx";
import {
  MUSIC_THEORY_KEYS,
  MUSIC_THEORY_SCALES,
} from "../../config/constants.ts";

type Anchor = "top" | "left" | "bottom" | "right";

const flexContainer = {
  display: "flex",
  flexDirection: "row",
};

interface SideBarProps {
  sequencerTypes: Array<string>;
  arrangerTypes: Array<string>;
  synthTypes: Array<string>;
  tempo: Number;
  setTempo: Function;
  play: boolean;
  playPause: Function;
  musicKey: IMusicKey;
  setKey: Function;
  musicScale: IMusicScale;
  setScale: Function;
}

export default function Sidebar(props: SideBarProps) {
  const {
    tempo,
    setTempo,
    musicScale,
    setScale,
    musicKey,
    setKey,
    play,
    playPause,
  } = props;

  console.log(musicKey);
  console.log(musicScale);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Synthesizers" {...a11yProps(0)} />
          <Tab label="Sequencers" {...a11yProps(1)} />
          <Tab label="Arrangers" {...a11yProps(2)} />
        </Tabs>
        <IconButton
          color="inherit"
          aria-label="close drawer"
          onClick={toggleDrawer("bottom", false)}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <MachineDrawer
        slug="synthesizers"
        machines={props.synthTypes}
        index={0}
        value={value}
      />
      <MachineDrawer
        slug="sequencers"
        machines={props.sequencerTypes}
        index={1}
        value={value}
      />
      <MachineDrawer
        slug="arrangers"
        machines={props.arrangerTypes}
        index={2}
        value={value}
      />
    </Box>
  );

  let anchor = "bottom";
  const checkboxLabel = { inputProps: { "aria-label": "Play Button" } };

  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer("bottom", true)}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <FormGroup style={flexContainer}>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  value={tempo}
                  onChange={(event) => {
                    console.log(event.target.value);
                    setTempo(event.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">bpm</InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel id="key-label">Key</InputLabel>
                <Select
                  labelId="key-label"
                  id="key-select"
                  value={musicKey}
                  label="Key"
                  onChange={(event) => {
                    console.log(event.target.value);
                    setKey(event.target.value);
                  }}
                >
                  {MUSIC_THEORY_KEYS.map((keyOption: string, i: number) => {
                    return (
                      <MenuItem key={i} value={keyOption}>
                        {keyOption}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel id="scale-label">Scale</InputLabel>
                <Select
                  labelId="scale-label"
                  id="scale-select"
                  value={musicScale}
                  label="Scale"
                  onChange={(event) => {
                    console.log(event.target.value);
                    setScale(event.target.value);
                  }}
                >
                  {MUSIC_THEORY_SCALES.map((scaleOption: string, i: number) => {
                    return (
                      <MenuItem key={i} value={scaleOption}>
                        {scaleOption}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </FormGroup>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
        <div></div>
      </AppBar>
      <Drawer
        anchor={anchor}
        variant="persistent"
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        {list(anchor)}
      </Drawer>
    </React.Fragment>
  );
}
