"use strict";function setActiveLink(){var t=window.location.href,a=document.getElementsByClassName("nav-link");Array.prototype.forEach.call(a,function(a){a.href==t&&(a.className="nav-link-active")})}$(document).ready(function(){$("#contact-submit").click(function(){var t=$("#contact-name").val(),a=$("#contact-email").val(),n=$("#contact-message").val();$.post("http://localhost:8000/contact",{name:t,email:a,message:n},function(t){"sent"==t&&$("message").empty().html("Email has been sent :)")})})}),window.onload=setActiveLink;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhY3QvY29udGFjdC5qcyJdLCJuYW1lcyI6WyJzZXRBY3RpdmVMaW5rIiwicGFnZVVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImxpbmsiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJBcnJheSIsInByb3RvdHlwZSIsImZvckVhY2giLCJjYWxsIiwiaXRlbSIsImNsYXNzTmFtZSIsIiQiLCJyZWFkeSIsImNsaWNrIiwibmFtZSIsInZhbCIsImVtYWlsIiwibWVzc2FnZSIsInBvc3QiLCJkYXRhIiwiZW1wdHkiLCJodG1sIiwib25sb2FkIl0sIm1hcHBpbmdzIjoiQUFBQSxZQUFBLFNBQVNBLGlCQUNSLEdBQUlDLEdBQVVDLE9BQU9DLFNBQVNDLEtBQzFCQyxFQUFPQyxTQUFTQyx1QkFBdUIsV0FFM0NDLE9BQU1DLFVBQVVDLFFBQVFDLEtBQUtOLEVBQU0sU0FBVU8sR0FDeENBLEVBQUtSLE1BQVFILElBQ2hCVyxFQUFLQyxVQUFZLHFCQUtwQkMsRUFBRVIsVUFBVVMsTUFBTSxXQUVqQkQsRUFBRSxtQkFBbUJFLE1BQU0sV0FDMUIsR0FBSUMsR0FBT0gsRUFBRSxpQkFBaUJJLE1BQzFCQyxFQUFRTCxFQUFFLGtCQUFrQkksTUFDNUJFLEVBQVVOLEVBQUUsb0JBQW9CSSxLQUNwQ0osR0FBRU8sS0FBSyxpQ0FBa0NKLEtBQU1BLEVBQU1FLE1BQU9BLEVBQU9DLFFBQVNBLEdBQVUsU0FBVUUsR0FDbkYsUUFBUkEsR0FDSFIsRUFBRSxXQUFXUyxRQUFRQyxLQUFLLGdDQU05QnRCLE9BQU91QixPQUFTekIiLCJmaWxlIjoiY29udGFjdC9jb250YWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gc2V0QWN0aXZlTGluaygpIHtcblx0dmFyIHBhZ2VVcmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCduYXYtbGluaycpO1xuXG5cdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobGluaywgZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRpZiAoaXRlbS5ocmVmID09IHBhZ2VVcmwpIHtcblx0XHRcdGl0ZW0uY2xhc3NOYW1lID0gJ25hdi1saW5rLWFjdGl2ZSc7XG5cdFx0fVxuXHR9KTtcbn1cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cblx0JChcIiNjb250YWN0LXN1Ym1pdFwiKS5jbGljayhmdW5jdGlvbigpIHtcblx0XHR2YXIgbmFtZSA9ICQoXCIjY29udGFjdC1uYW1lXCIpLnZhbCgpO1xuXHRcdHZhciBlbWFpbCA9ICQoXCIjY29udGFjdC1lbWFpbFwiKS52YWwoKTtcblx0XHR2YXIgbWVzc2FnZSA9ICQoJyNjb250YWN0LW1lc3NhZ2UnKS52YWwoKTtcblx0XHQkLnBvc3QoJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jb250YWN0Jywge25hbWU6IG5hbWUsIGVtYWlsOiBlbWFpbCwgbWVzc2FnZTogbWVzc2FnZX0sIGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRpZiAoZGF0YSA9PSBcInNlbnRcIikge1xuXHRcdFx0XHQkKFwibWVzc2FnZVwiKS5lbXB0eSgpLmh0bWwoXCJFbWFpbCBoYXMgYmVlbiBzZW50IDopXCIpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcbn0pO1xuXG53aW5kb3cub25sb2FkID0gc2V0QWN0aXZlTGluazsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
