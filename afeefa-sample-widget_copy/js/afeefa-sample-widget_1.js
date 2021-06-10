define(["knockout", "koValidate", "CCi18n"], function (ko, koValidate, CCi18n) {
  "use strict";
  var getWidget;
  return {
    /*
     * Note that "this" is bound to the Widget View Model.
     */
    //      validateNow :  ko.observable(false),
    students: ko.observableArray(),
    currStudent: ko.observable({}),
    showResult: ko.observable(false),
    firstNameEditable: ko.observable(true),
    student: function () {
      var self = this;
      self.firstName = ko.observable();

      self.lastName = ko.observable(); //y

      self.dayOptionValues = getWidget.generateDays();
      self.daySelectedOptionValue = ko.observable("Day");
      self.monthOptionValues = [
        "Month",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      self.monthSelectedOptionValue = ko.observable("Month");
      self.yearOptionValues = getWidget.generateYearsBetween();
      self.yearSelectedOptionValue = ko.observable("Year");

      self.email = ko.observable(); //y
      self.mobile = ko.observable(); //y
      self.genderSelected = ko.observable("Male"); //y
      self.address = ko.observable(""); //y
      self.city = ko.observable(""); //y
      self.zip = ko.observable(""); //y

      self.stateOptionValues = [
        "Delhi",
        "Uttar Pradesh",
        "Tamil Nadu",
        "Maharashtra",
      ];
      self.stateSelectedOptionValue = ko.observable("Delhi"); //y
      self.countryOptionValues = ["India"];
      self.countrySelectedOptionValue = ko.observable("India"); //y
      self.hobbyDrawing = ko.observable(true);
      self.hobbySinging = ko.observable(true);
      self.hobbyDancing = ko.observable(true);
      self.hobbyOthers = ko.observable(true);
      self.otherHobbiesText = ko.observable();

      self.hobbies = ko.observableArray(); //y

      self.xEnglish = ko.observable(0);
      self.xHindi = ko.observable(0);
      self.xMathematics = ko.observable(0);
      self.xScience = ko.observable(0);
      self.xSocial = ko.observable(0);
      self.xiiEnglish = ko.observable(0);
      self.xiiHindi = ko.observable(0);
      self.xiiMathematics = ko.observable(0);
      self.xiiScience = ko.observable(0);
      self.xiiSocial = ko.observable(0);

      self.courseApplied = ko.observable(""); //y
      self.agreeTerms = ko.observable(false); //y

      
      self.dob = ko.computed(function () {
        return (
          self.daySelectedOptionValue() +
          " " +
          self.monthSelectedOptionValue() +
          "," +
          self.yearSelectedOptionValue()
        );
      }, getWidget); //y

      self.xtotal = ko.computed(function () {
        return (
          Number(self.xEnglish()) +
          Number(self.xHindi()) +
          Number(self.xMathematics()) +
          Number(self.xScience()) +
          Number(self.xSocial())
        );
      }, getWidget); //y

      self.xiitotal = ko.computed(function () {
        return (
          Number(self.xiiEnglish()) +
          Number(self.xiiHindi()) +
          Number(self.xiiMathematics()) +
          Number(self.xiiScience()) +
          Number(self.xiiSocial())
        );
      }, getWidget); //y
    },

    generateYearsBetween: function () {
      var years = [];
      years.push("Year");
      for (var i = 1990; i <= 2021; i++) {
        years.push(i);
      }
      return years;
    },

    generateDays: function () {
      var days = [];
      days.push("Day");
      for (var i = 1; i <= 31; i++) {
        days.push(i);
      }
      return days;
    },

    onLoad: function (widget) {
      getWidget = widget;
      var self = widget;
      widget.currStudent(new widget.student());

      widget.validationRules = function () {
        self.currStudent().firstName.extend({
          minLength: 2,
          required: {
            params: true,
            message: "Please enter first name.",
          },
          });

        self.currStudent().lastName.extend({ minLength: 2, required: true });
        self.currStudent().email.extend({ email: true, required: true });
        self.currStudent().mobile.extend({ phoneUS: true, required: true });

        self.currStudent().xEnglish.extend({ min: 30, max: 100 });
        self.currStudent().xHindi.extend({ min: 30, max: 100 });
        self.currStudent().xMathematics.extend({ min: 30, max: 100 });
        self.currStudent().xScience.extend({ min: 30, max: 100 });
        self.currStudent().xSocial.extend({ min: 30, max: 100 });
        self.currStudent().xiiEnglish.extend({ min: 30, max: 100 });
        self.currStudent().xiiHindi.extend({ min: 30, max: 100 });
        self.currStudent().xiiMathematics.extend({ min: 30, max: 100 });
        self.currStudent().xiiScience.extend({ min: 30, max: 100 });
        self.currStudent().xiiSocial.extend({ min: 30, max: 100 });
      };

      widget.validationRules();

      widget.validateNowFunc = function () {
        self.currStudent().firstName.isModified(true);
        self.currStudent().lastName.isModified(true);
        self.currStudent().email.isModified(true);
        self.currStudent().mobile.isModified(true);

        self.currStudent().xEnglish.isModified(true);
        self.currStudent().xHindi.isModified(true);
        self.currStudent().xMathematics.isModified(true);
        self.currStudent().xScience.isModified(true);
        self.currStudent().xSocial.isModified(true);
        self.currStudent().xiiEnglish.isModified(true);
        self.currStudent().xiiHindi.isModified(true);
        self.currStudent().xiiMathematics.isModified(true);
        self.currStudent().xiiScience.isModified(true);
        self.currStudent().xiiSocial.isModified(true);
        //return self.currStudent().firstName.isValid();
      };

      self.resultFunc = function () {
        self.showResult(true);
        console.log("in result");
        var tempList = JSON.parse(localStorage.getItem("students"));
        if (tempList != null) {
          self.students.removeAll();
          console.log(self.students().length);
          // push.apply() to add multiple items
          self.students.push.apply(self.students, tempList);
        }
        console.log(self.students().length);
      };
      self.submitFunc = function () {
        console.log("in submit");
        //   getWidget.validateNow(true);
        widget.validateNowFunc();
        var errors = ko.validation.group(self.currStudent());
        console.log(errors());
        if (errors().length > 0) {
          alert("Please fix all errors before proceeding!");
          //            errors.showAllMessages(true);
        } else {
          if (self.currStudent().agreeTerms()) {
            self.firstNameEditable(true);
            self.showResult(false);
            self.currStudent().hobbies([]);

            // adding items in hobbies array
            if (self.currStudent().hobbyDrawing())
              self.currStudent().hobbies.push("Drawing");
            if (self.currStudent().hobbySinging())
              self.currStudent().hobbies.push("Singing");
            if (self.currStudent().hobbyDancing())
              self.currStudent().hobbies.push("Dancing");
            if (
              self.currStudent().hobbyOthers() &&
              self.currStudent().otherHobbiesText() != undefined
            ) {
              var h = self
                .currStudent()
                .otherHobbiesText()
                .toString()
                .split(",");
              self
                .currStudent()
                .hobbies.push.apply(self.currStudent().hobbies, h);
            }

            // getting all students in array
            var existingEntries = JSON.parse(localStorage.getItem("students"));
            if (existingEntries == null) existingEntries = [];

            var index = existingEntries.findIndex(function (stu) {
              return stu.firstName == self.currStudent().firstName();
            });
            //removing the student if already exists while update
            if (index != -1) {
              existingEntries.splice(index, 1);
            }
            console.log(index);
            // adding new student in array
            existingEntries.push(self.currStudent());
            // setting new student in local storage
            localStorage.setItem("students", ko.toJSON(existingEntries));
            alert("Details has been saved!");
            self.currStudent(new widget.student());
          } else {
            alert("Click on checkbox before submitting the information!");
          }
        }
      };
      self.removeStudent = function (student) {
        console.log("in remove");
        self.students.remove(student);
        console.log(self.students().length);
        localStorage.setItem("students", ko.toJSON(self.students));
      };
      self.editStudent = function (stu) {
        self.firstNameEditable(false);
        self.showResult(false);
        console.log("in edit");
        console.log(stu);
        var editableStudent = new widget.student();

        Object.assign(editableStudent, ko.mapping.fromJS(stu));
        self.currStudent(editableStudent);

        //self.currStudent(ko.mapping.fromJS(stu));
        widget.validationRules();
        console.log("current student:");
        console.log(self.currStudent());
        self.currStudent().agreeTerms(false);
      };

      console.log(widget.exampleStringProperty());
      console.log(widget.exampleOptionProperty());
      console.log(widget.exampleBooleanProperty());
    },

    beforeAppear: function (page) {},
  };
});
