require("fs").writeFileSync(
  require("path").join(__dirname, "..", ".npmignore"),
  `*
!build/**/*
!bin/**/*
`
);
