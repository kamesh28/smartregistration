package com.smart.service;

import java.io.File;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.stereotype.Service;

@Service
public class EmailService {
	
	public boolean sendEmail(String subject,String message,String to)
    {
       // rest of the code...
        boolean f=false;
        String from="sunnyvzm1443@gmail.com";
        //variable for gmail
        String host="smtp.gmail.com";

        // get the system properties
        Properties properties=System.getProperties();
        // System.out.println("PROPERIIES" +properties);

        //setting important information to properties object

        //host set
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");

        //Step1 : to get the session object...
        Session session = Session.getInstance(properties, new Authenticator() {

            @Override
            protected PasswordAuthentication getPasswordAuthentication() {

                return new PasswordAuthentication("sunnyvzm1443@gmail.com", "Mksr#121");
            }

        });

        session.setDebug(true);

        //Step 2: compose the message
        MimeMessage m = new MimeMessage(session);



        try {

            //from email
            m.setFrom(from);


            // adding recipient to message
            m.addRecipient(Message.RecipientType.TO, new InternetAddress(to));


            //adding subject to message
            m.setSubject(subject);

            //adding text to message
           // m.setText(message); [for little bit]
            m.setContent(message, "text/html");

            //send

            //Step 3: send the message using Transport
            Transport.send(m);

            System.out.println("Sent Successfully........");
            f=true;

        } catch (Exception e) {

            e.printStackTrace();
        }
            return f;
    }	
}

