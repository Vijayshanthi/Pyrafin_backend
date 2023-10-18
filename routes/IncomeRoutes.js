const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authorizeJWT = require("./authmiddleware");
const IncomeController = new (require("../Controller/IncomeController"))();

router.post(
  "/addincome",
  [
    check("CompanyName")
      .isLength({ min: 1 })
      .withMessage("Invalid: Company Name must have at least 1 character"),
    check("StreetAddress")
      .isLength({ min: 1 })
      .withMessage("Invalid: StreetAddress must have at least 1 character"),
    check("Items")
      .isLength({ min: 1 })
      .withMessage("Invalid: StreetAddress must have at least 1 character"),
    check("Status")
      .notEmpty()
      .isString()
      .isIn(["Paid", "UnPaid", "Overdue", "Declined"])
      .withMessage(
        "Invalid status. Status must be one of: Paid, UnPaid, Overdue, Declined"
      ),
    check("Particulars")
      .isLength({ min: 1 })
      .withMessage("Invalid: Particulars must have at least 1 character"),
    check("State")
      .isLength({ min: 1 })
      .withMessage("Invalid: State must have at least 1 character"),
    check("City")
      .isLength({ min: 1 })
      .withMessage("Invalid: City must have at least 1 character"),
    check("StreetAddress")
      .isLength({ min: 1 })
      .withMessage("Invalid: PlaceofSupply must have at least 1 character"),
    check("GSTIN")
      .isLength({ min: 1 })
      .withMessage("Invalid: GSTIN must have at least 1 character"),
    check("CGST").optional().isNumeric(),
    check("SGST").optional().isNumeric(),
    check("IGST").optional().isNumeric(),
    check("TotalAmount").notEmpty().isNumeric(),
    check("BalanceDue").notEmpty().isNumeric(),
    check("Rate")
      .isLength({ min: 1, max: 8 })
      .notEmpty()
      .isNumeric()
      .withMessage("Rate out of range.Please enter again"),
    check("DueDate").notEmpty().isISO8601(),
    check("ActionDate").notEmpty().isISO8601(),
    check("PSYear").notEmpty().isString(),
    check("Pincode").notEmpty().isNumeric(),
    check("HSNSAC").notEmpty().isNumeric(),
    check("ACNO").notEmpty().isLength({ min: 10 }).isNumeric(),
    check("BankName")
      .isLength({ min: 5 })
      .withMessage("Invalid: BankName must have at least 5 character"),
    check("Branch")
      .isLength({ min: 1 })
      .withMessage("Invalid: Branch must have at least 1 character"),
    check("IFSCCode")
      .isLength({ min: 5 })
      .withMessage("Invalid: IFSCCode must have at least 5 character"),
    check("BeneficiaryName")
      .isLength({ min: 5 })
      .withMessage("Invalid: BeneficiaryName must have at least 5 character"),
    check("AccountDetails")
      .isLength({ min: 1 })
      .withMessage("Invalid: AccountDetails must have at least 1 character"),
  ],
  authorizeJWT,
  function (request, response) {
    const error = validationResult(request);
    if (error.array().length) {
      return response
        .status(500)
        .send({ msg: error.errors[0].msg, path: error.errors[0].path });
    } else {
      IncomeController.addIncomeController(
        request.body,
        function ({ message, status }) {
          return response
            .status(status)
            .send({ message: message, status: status });
        }
      );
    }
  }
);

router.get("/getincomedetails", authorizeJWT, function (request, response) {
  IncomeController.getListIncomeController(request, function ({ data }) {
    return response.send(data);
  });
});

router.put(
  "/updateincome/:id",

  [
    check("id").isLength({ min: 1 }).isNumeric().withMessage("Invalid id"),
    check("CompanyName")
      .isLength({ min: 1 })
      .withMessage("Invalid: Company Name must have at least 1 character"),
    check("StreetAddress")
      .isLength({ min: 1 })
      .withMessage("Invalid: StreetAddress must have at least 1 character"),
    check("Items")
      .isLength({ min: 1 })
      .withMessage("Invalid: StreetAddress must have at least 1 character"),
    check("Status")
      .notEmpty()
      .isString()
      .isIn(["Paid", "UnPaid", "Overdue", "Declined"])
      .withMessage(
        "Invalid status. Status must be one of: Paid, UnPaid, Overdue, Declined"
      ),
    check("Particulars")
      .isLength({ min: 1 })
      .withMessage("Invalid: Particulars must have at least 1 character"),
    check("State")
      .isLength({ min: 1 })
      .withMessage("Invalid: State must have at least 1 character"),
    check("City")
      .isLength({ min: 1 })
      .withMessage("Invalid: City must have at least 1 character"),
    check("StreetAddress")
      .isLength({ min: 1 })
      .withMessage("Invalid: PlaceofSupply must have at least 1 character"),
    check("GSTIN")
      .isLength({ min: 1 })
      .withMessage("Invalid: GSTIN must have at least 1 character"),
    check("CGST").optional().isNumeric(),
    check("SGST").optional().isNumeric(),
    check("IGST").optional().isNumeric(),
    check("TotalAmount").notEmpty().isNumeric(),
    check("BalanceDue").notEmpty().isNumeric(),
    check("Rate")
      .isLength({ min: 1, max: 8 })
      .notEmpty()
      .isNumeric()
      .withMessage("Rate out of range.Please enter again"),
    check("DueDate").notEmpty().isISO8601(),
    check("ActionDate").notEmpty().isISO8601(),
    check("PSYear").notEmpty().isString(),
    check("Pincode").notEmpty().isNumeric(),
    check("HSNSAC").notEmpty().isNumeric(),
    check("ACNO").notEmpty().isLength({ min: 5 }).isNumeric(),
    check("BankName")
      .isLength({ min: 5 })
      .withMessage("Invalid: BankName must have at least 5 character"),
    check("Branch")
      .isLength({ min: 1 })
      .withMessage("Invalid: Branch must have at least 1 character"),
    check("IFSCCode")
      .isLength({ min: 5 })
      .withMessage("Invalid: IFSCCode must have at least 5 character"),
    check("BeneficiaryName")
      .isLength({ min: 5 })
      .withMessage("Invalid: BeneficiaryName must have at least 5 character"),
    check("AccountDetails")
      .isLength({ min: 1 })
      .withMessage("Invalid: AccountDetails must have at least 1 character"),
  ],
  authorizeJWT,
  function (request, response) {
    const error = validationResult(request);
    if (error.array().length) {
      return response
        .status(500)
        .send({ msg: error.errors[0].msg, path: error.errors[0].path });
    } else {
      IncomeController.updateIncomeController(
        request,
        function ({ message, status }) {
          return response.status(status).send(message);
        }
      );
    }
  }
);

router.put(
  "/deletesinglerecord/:id",

  [check("id").isLength({ min: 1 }).isNumeric().withMessage("Invalid id")],
  authorizeJWT,
  function (request, response) {
    const error = validationResult(request);
    if (error.array().length) {
      return response.status(500).send(error.errors[0].msg);
    } else {
      IncomeController.deleteIncomeController(
        request,
        function ({ message, status }) {
          return response.status(status).send(message);
        }
      );
    }
  }
);

router.get("/getTotalIncomeRate", authorizeJWT, function (request, response) {
  IncomeController.getTotalIncomeController(request, function ({ data }) {
    return response.send(data);
  });
});

router.get(
  "/getUnpaidTotalIncomeRate",
  authorizeJWT,
  function (request, response) {
    IncomeController.getUnpaidTotalIncomeController(
      request,
      function ({ data }) {
        return response.send(data);
      }
    );
  }
);

router.get(
  "/generateinvoice/:id",

  [check("id").isLength({ min: 1 }).isNumeric().withMessage("Invalid id")],
  authorizeJWT,
  function (request, response) {
    const error = validationResult(request);
    if (error.array().length) {
      return response.status(500).send(error.errors[0].msg);
    } else {
      IncomeController.generateInvoiceController(
        request,
        function ({ message, status, fileName }) {
          return response
            .status(status)
            .send({ fileName: fileName, message: message });
        }
      );
    }
  }
);

router.get(
  "/generatereceipt/:id",
  [check("id").isLength({ min: 1 }).isNumeric().withMessage("Invalid id")],
  authorizeJWT,
  function (request, response) {
    const error = validationResult(request);
    if (error.array().length) {
      return response.status(500).send(error.errors[0].msg);
    } else {
      IncomeController.generateReceiptController(
        request,
        function ({ message, status, fileName }) {
          return response
            .status(status)
            .send({ fileName: fileName, message: message });
        }
      );
    }
  }
);

module.exports = router;