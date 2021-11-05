import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { iLine, iMishna, iSubline } from "../../types/types";
import { connect } from "react-redux";
import { selectSublines } from "../../store/actions";
import { getSugiaLines } from "../../inc/mishnaUtils";
import * as _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'none',
    color: '#595959',
	border: 'none',
	padding: 0,
	font: 'inherit',
	cursor: 'pointer',
	outline: 'inherit'
  }, 
  smallTitle: {
    //@ts-ignore
    ...theme.typography.smallTitle,
  },
}));

const mapDispatchToProps = (dispatch:any) => ({
    selectSublines: (lineData)=>{
        dispatch(selectSublines(lineData));
    }
  })

const mapStateToProps = state => ({
    selectedSublines: state.mishnaView.selectedSublines,
    currentMishna: state.general.currentMishna,
})
interface Props {
    index: number;
    line: iLine;
    selectSublines: Function;
    selectedSublines: iSubline[];
    currentMishna: iMishna;
}
const SugiaButton = (props: Props) => {
  const classes = useStyles();
  const { index, line, selectSublines, currentMishna, selectedSublines } = props;
  let l = line?.sublines ? line?.sublines[0] : null;

  const selectSugiaHandler = ()=>{
      const sugiaSublines = getSugiaLines(currentMishna, line);
      const diff = _.difference(sugiaSublines, selectedSublines);
      if (diff.length===0){
        selectSublines([])
      } else {
        selectSublines(sugiaSublines)
      }
  }

  
  return (
    <button 
    onClick={selectSugiaHandler}
    className={classes.root}>
      <div style={{ marginTop: "0.6rem", marginBottom: "0.3rem" }}>
        <Typography align="center" className={classes.smallTitle}>
        [{index} {line.sugiaName}]
        </Typography>
      </div>
    </button>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SugiaButton);
