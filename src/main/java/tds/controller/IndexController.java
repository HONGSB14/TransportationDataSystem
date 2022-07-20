package tds.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.io.BufferedReader;
import java.io.IOException;


@Controller
public class IndexController {
    //메인 페이징
    @GetMapping("/")
    public String main() throws Exception {

        return "main";
    }
}