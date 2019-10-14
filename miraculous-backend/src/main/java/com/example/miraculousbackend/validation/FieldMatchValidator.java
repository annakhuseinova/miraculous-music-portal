package com.example.miraculousbackend.validation;

import org.springframework.beans.BeanWrapperImpl;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;


public class FieldMatchValidator implements ConstraintValidator<FieldMatch, Object> {

    private String firstFieldName;
    private String secondFieldName;
    private String message;

    @Override
    public void initialize(FieldMatch constraintAnnotation) {

        firstFieldName = constraintAnnotation.firstField();
        secondFieldName = constraintAnnotation.secondField();
        message = constraintAnnotation.message();
    }

    @Override
    public boolean isValid(Object object, ConstraintValidatorContext constraintValidatorContext) {

        boolean valid;
        Object firstField = new BeanWrapperImpl(object).getPropertyValue(firstFieldName);
        Object secondField = new BeanWrapperImpl(object).getPropertyValue(secondFieldName);

        valid = firstField == null && secondField == null || firstField != null && firstField.equals(secondField);
        if (!valid){

            constraintValidatorContext.buildConstraintViolationWithTemplate(message).addPropertyNode(firstFieldName)
                    .addConstraintViolation().disableDefaultConstraintViolation();
        }
        return valid;
    }
}
