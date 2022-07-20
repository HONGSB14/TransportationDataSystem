package tds.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tds.service.LocationService;

@RestController
@RequestMapping("location")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @GetMapping
    public boolean locationData(@RequestParam("coordinate")String coordinate, @RequestParam("carNumber")String carNumber, @RequestParam("companyNumber") int companyNumber){
         return locationService.locationData(coordinate,carNumber,companyNumber);
    }
}
