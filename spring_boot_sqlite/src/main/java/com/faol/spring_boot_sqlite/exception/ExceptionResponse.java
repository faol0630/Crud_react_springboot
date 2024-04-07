package com.faol.spring_boot_sqlite.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExceptionResponse {

    private Date timestamp;
    private String message;
    private String errorDetails;
    private Map<String, String> validationErrors;

    public ExceptionResponse(Date timestamp, String message, String errorDetails) {
        this.timestamp = timestamp;
        this.message = message;
        this.errorDetails = errorDetails;
    }

}
//this class is created before creating the class that will handle the exceptions
//this is the response that will be displayed when an error occurs
