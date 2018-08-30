//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.wisdragon.pfs.nenu.servicehall.controller;

import com.wisdragon.pfs.common.CheckMobile;
import com.wisdragon.pfs.nenu.servicehall.service.MyApplyService;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONObject;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping({"/MyApply"})
@Scope("request")
public class MyApplyController {
    private CheckMobile checkMobile;
    @Resource(
        name = "MyApplyService"
    )
    private MyApplyService myApplyService;

    public MyApplyController() {
    }

    @RequestMapping({"/viewApplyList"})
    public ModelAndView viewApplyPage(HttpServletRequest request, HttpServletResponse response) {
        ModelAndView mv = new ModelAndView();
        CheckMobile var10000 = this.checkMobile;
        if (CheckMobile.check(request)) {
            mv.setViewName("../business/pages/MyApply/mobile/MyApply_Grid");
        } else {
            mv.setViewName("../business/pages/MyApply/pc/MyApply_Grid");
        }

        return mv;
    }

    @RequestMapping({"/query"})
    @ResponseBody
    public List<Map> query() {
        try {
            return this.myApplyService.getMyApplyList();
        } catch (Exception var2) {
            var2.printStackTrace();
            return null;
        }
    }

    @RequestMapping({"/getMyApplyHandCount"})
    @ResponseBody
    public JSONObject getMyApplyHandCount() {
        JSONObject json = new JSONObject();
        String myApplyHandCount = "";

        try {
            myApplyHandCount = this.myApplyService.getMyApplyHandCount();
            json.put("success", true);
            json.put("myApplyHandCount", myApplyHandCount);
        } catch (Exception var4) {
            json.put("success", false);
            var4.printStackTrace();
        }

        return json;
    }

    @RequestMapping({"/getMyApplyCompletedCount"})
    @ResponseBody
    public JSONObject getMyApplyCompletedCount() {
        JSONObject json = new JSONObject();
        String myApplyCompletedCount = "";

        try {
            myApplyCompletedCount = this.myApplyService.getMyApplyCompletedCount();
            json.put("success", true);
            json.put("myApplyCompletedCount", myApplyCompletedCount);
        } catch (Exception var4) {
            json.put("success", false);
            var4.printStackTrace();
        }

        return json;
    }

    @RequestMapping(
        value = {"/getMyApplyHandList"},
        method = {RequestMethod.POST}
    )
    @ResponseBody
    public Map getMyApplyHandList() {
        try {
            return this.myApplyService.getMyApplyHandList();
        } catch (Exception var2) {
            var2.printStackTrace();
            return null;
        }
    }

    @RequestMapping(
        value = {"/getMyApplyCompletedList"},
        method = {RequestMethod.POST}
    )
    @ResponseBody
    public Map getMyApplyCompletedList() {
        try {
            return this.myApplyService.getMyApplyCompletedList();
        } catch (Exception var2) {
            var2.printStackTrace();
            return null;
        }
    }

    @RequestMapping({"/getMyApplyMobileHandList"})
    @ResponseBody
    public JSONObject getMyApplyMobileHandList() {
        JSONObject json = new JSONObject();
        new ArrayList();

        try {
            List<Map> MyApplyMobileHandList = this.myApplyService.getMyApplyMobileHandGridList();
            json.put("success", true);
            json.put("MyApplyMobileHandList", MyApplyMobileHandList);
        } catch (Exception var4) {
            json.put("success", false);
            var4.printStackTrace();
        }

        return json;
    }

    @RequestMapping({"/getMyApplyMobileCompletedList"})
    @ResponseBody
    public JSONObject getMyApplyMobileCompletedList() {
        JSONObject json = new JSONObject();
        new ArrayList();

        try {
            List<Map> MyApplyMobileCompletedList = this.myApplyService.getMyApplyMobileCompletedList();
            json.put("success", true);
            json.put("MyApplyMobileCompletedList", MyApplyMobileCompletedList);
        } catch (Exception var4) {
            json.put("success", false);
            var4.printStackTrace();
        }

        return json;
    }

    @RequestMapping({"/getMyApplyList"})
    @ResponseBody
    public JSONObject getMyApplyList() {
        JSONObject json = new JSONObject();
        new ArrayList();

        try {
            List<Map> MyApplyList = this.myApplyService.getMyApplyList();
            json.put("success", true);
            json.put("MyApplyList", MyApplyList);
        } catch (Exception var4) {
            json.put("success", false);
            var4.printStackTrace();
        }

        return json;
    }

    @RequestMapping({"/getSelectOptionFromJson"})
    @ResponseBody
    public JSONObject getSelectOptionFromJson() {
        JSONObject json = new JSONObject();

        try {
            json.put("success", true);
            json.put("Info", this.myApplyService.getSelectOptionFromJson());
        } catch (Exception var3) {
            json.put("Info", "");
            json.put("success", false);
            var3.printStackTrace();
        }

        return json;
    }

    @RequestMapping(
        value = {"/getMyApplyAnalysis"},
        method = {RequestMethod.POST}
    )
    @ResponseBody
    public Map getMyApplyAnalysis() {
        try {
            return this.myApplyService.getMyApplyAnalysis();
        } catch (Exception var2) {
            var2.printStackTrace();
            return null;
        }
    }

    @RequestMapping({"/viewApplyAnalysisPage"})
    public ModelAndView viewApplyAnalysisPage(HttpServletRequest request, HttpServletResponse response) {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("../business/pages/analysis/pc/personalAnalysis");
        return mv;
    }

    @RequestMapping(
        value = {"/getMyApplyAnalysisValue"},
        method = {RequestMethod.POST}
    )
    @ResponseBody
    public JSONObject getMyApplyAnalysisValue() {
        List<Map> analysisList = this.myApplyService.getMyApplyAnalysisValue();
        JSONObject json = new JSONObject();

        try {
            json.put("analysisList", analysisList);
            json.put("success", true);
        } catch (Exception var4) {
            json.put("success", false);
            var4.printStackTrace();
        }

        return json;
    }
}
