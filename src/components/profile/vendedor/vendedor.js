import React from 'react';
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Parallax from '../../parallax/parallax';
import Header from '../../header/header';
import HeaderLinks from '../../header/headerLinks';
import Button from "../../customButtons/button.js";
import GridContainer from "../../grid/gridContainer.js";
import GridItem from "../../grid/gridItem.js";
import styles from "../../../assets/jss/profilePage";

const useStyles = makeStyles(styles);

const Vendedor = (props) =>{
    const company = props.company;
    const classes = useStyles();
    console.log(company)
    const {...rest} = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    return(
        <div>
            <Header
            color="transparent"
            brand={`Bienvenido ${company.company_name}`}
            rightLinks={<HeaderLinks />}
            fixed
            changeColorOnScroll={{
            height: 200,
            color: "white"
            }}
            {...rest}
            />    
            <Parallax small filter image={require("../../../assets/img/profile-bg.jpg")}/>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>
                                <div className={classes.profile}>
                                    <div>
                                        <img src={require('../../../assets/img/google.jpg')} alt="..." className={imageClasses} />
                                    </div>
                                    <div className={classes.name}>
                                        <h3 className={classes.title}>{company.company_name}</h3>
                                        <h6>Rubro Compañia</h6>
                                        <Button justIcon link className={classes.margin5}>
                                            <i className={"fa fa-link"} /> Sitio Web
                                        </Button>
                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <div className={classes.description}>
                            <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vendedor;