
import React, {useState} from 'react';
import {ReduxStore} from '../../../utilities/reduxTypes';
import {connect} from 'react-redux';
import assert from 'assert';
import {FieldConfig, FormDataInterface} from '../../../utilities/fieldTypes';
import {modifyData} from '../../../utilities/reduxActions';
import QuestionTitleBox from './FieldParts/QuestionTitleBox';
import EmailField from './EmailField';


interface FormFieldComponentProps {
    fieldIndex: number;
    visibleFieldIndex: number;

    fieldConfig: FieldConfig;

    formData: any;
    modifyData(formData: any): any;
}

function FormFieldComponent(props: FormFieldComponentProps) {

    assert(props.formData !== undefined);

    const [manipulated, setManipulated] = useState(false);

    function modifyFieldData(newValue: any) {
        const newFormData: any = JSON.parse(JSON.stringify(props.formData));
        newFormData[(props.fieldIndex + 1).toString()] = newValue;
        props.modifyData(newFormData);
        setManipulated(true);
    }

    let opacityClass = '';
    if (props.fieldIndex > props.visibleFieldIndex) {
        opacityClass = 'translate-y-100vh';
    } else if (props.fieldIndex < props.visibleFieldIndex) {
        opacityClass = '-translate-y-100vh';
    }

    let FieldComponent: any;

    switch (props.fieldConfig.type) {
        case 'Email':
            FieldComponent = (
                <EmailField
                    fieldConfig={props.fieldConfig}
                    fieldData={props.formData[(props.fieldIndex + 1).toString()]}
                    modifyFieldData={modifyFieldData}
                    manipulated={manipulated}
                />
            );
            break;
        default:
            FieldComponent = <React.Fragment/>;
            break;
    }

    return (
        <div
            className={
                'block absolute top-0 left-0 w-full h-auto transform ' +
                'transition-transform duration-500 ' + opacityClass
            }
        >
            <div className='transform -translate-y-1/2'>
                <QuestionTitleBox
                    title={props.fieldConfig.title}
                    description={props.fieldConfig.description}
                />
                {FieldComponent}
            </div>
        </div>
    );
}

const mapStateToProps = (state: ReduxStore) => ({
    formData: state.formData,
});

const mapDispatchToProps = (dispatch: any) => ({
    modifyData: (formData: FormDataInterface) => dispatch(modifyData(formData)),
});

const FormField = connect(mapStateToProps, mapDispatchToProps)(FormFieldComponent);

export default FormField;