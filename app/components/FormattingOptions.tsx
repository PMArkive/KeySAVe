import * as React from "react";
import { Component } from "react";
import { FormattingOptions as FormattingOptionsHandlebars } from "./formatters/handlebars";
import { Paper, MenuItem, SelectField } from "material-ui";
const styles = require("./FormattingOptions.module.scss");

const languages = [
    <MenuItem key={1} value="en" primaryText="English" />,
    <MenuItem key={2} value="ja" primaryText="Japanese" />,
    <MenuItem key={3} value="de" primaryText="German" />,
    <MenuItem key={4} value="fr" primaryText="French" />,
    <MenuItem key={5} value="it" primaryText="Italian" />,
    <MenuItem key={6} value="es" primaryText="Spanish" />,
    <MenuItem key={7} value="ko" primaryText="Korean" />
];

interface FormattingOptionsProps {
    language: string;
    languageChanged: (language: string) => any;
}

const FormattingOptions = ({ language, languageChanged }: FormattingOptionsProps) => (
    <Paper className={styles.paper}>
        <h2>Formatting</h2>
        <SelectField
            onChange={(e, i, v) => languageChanged(v)}
            value={language}
            floatingLabelText="Language">
            {languages}
        </SelectField>
        <FormattingOptionsHandlebars />
    </Paper>
);

(FormattingOptions as any).propTypes = {
    language: React.PropTypes.string.isRequired,
    languageChanged: React.PropTypes.func.isRequired
}

export default FormattingOptions;