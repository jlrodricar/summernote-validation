function checkSummers() {

	var checkIfFalse = [];
	//SET VALIDATOR FOR ELEMENTS
	$(".summernote").each(function(index) {
		console.log(index + ": " + $(this).val());
		var elementSummer = $(this);
		if (elementSummer.prop('required')) {
			if ($(this).val() == "") {
				$(elementSummer).next("div.note-editor.note-frame.card").addClass("werror");
				$(elementSummer).parent().append('<label id="duracion-error" class="error" for="duracion">Este campo es obligatorio</label>');
				scrollToAnchor(elementSummer);
				checkIfFalse.push(elementSummer);
			}
		}
	});
	if (checkIfFalse.length > 0) {
		return false;
	} else {
		return true;
	}

}

$(document).ready(function() {
	var JSBase_url = $("#mybaseURL").val();
	/* Summernote Validation */
	$('.summernote').summernote({
		lang : "es-ES"
	});
	$("div.note-editor.note-frame.card").removeClass("werror");
	
	$("#nuevo_complemento_curso").validate({
		rules : {
			Autor : {
				required : true
			},
			duracion : {
				required : true
			},
			desc_bienvenida : {
				required : true
			}  
		},
		messages : {
			Autor : {
				required : "Este campo es obligatorio"
			},
			duracion : {
				required : "Este campo es obligatorio"
			},
			desc_bienvenida : {
				required : "Este campo es obligatorio"
			}
		},
		submitHandler : function(form) {
			//RESET VALIDATION
			$("div.note-editor.note-frame.card").removeClass("werror");
			//DO
			var checkForm = checkSummers();
			if(checkForm){
			
			var url = $("#complementCursosBtn").data("url-action");
			$("#complementCursosBtn").prop('disabled', true);

			var formData = new FormData(form);

			//SET ENCODE 64 TO HTML
			var enc64_desc_bienvenida = Base64.encode($("#desc_bienvenida").val());
			formData.append("enc64_desc_bienvenida", enc64_desc_bienvenida);

			var enc64_objetivo_uno = Base64.encode($("#objetivo_uno").val());
			formData.append("enc64_objetivo_uno", enc64_objetivo_uno);

			var enc64_objetivo_dos = Base64.encode($("#objetivo_dos").val());
			formData.append("enc64_objetivo_dos", enc64_objetivo_dos);

			var enc64_objetivo_tres = Base64.encode($("#objetivo_tres").val());
			formData.append("enc64_objetivo_tres", enc64_objetivo_tres);

			var enc64_inf_programacion = Base64.encode($("#inf_programacion").val());
			formData.append("enc64_inf_programacion", enc64_inf_programacion);

			var enc64_inf_evaluacion = Base64.encode($("#inf_evaluacion").val());
			formData.append("enc64_inf_evaluacion", enc64_inf_evaluacion);

			var enc64_inf_asistencia = Base64.encode($("#inf_asistencia").val());
			formData.append("enc64_inf_asistencia", enc64_inf_asistencia);

			var enc64_inf_certificado = Base64.encode($("#inf_certificado").val());
			formData.append("enc64_inf_certificado", enc64_inf_certificado);

			var enc64_inf_soporte = Base64.encode($("#inf_soporte").val());
			formData.append("enc64_inf_soporte", enc64_inf_soporte);


			
			 $.ajax({
			 type : 'POST',
			 url : url,
			 data : formData,
			 processData : false,
			 contentType : false,
			 success : function(response) {
			 console.log(response);

			 var misDatos = jQuery.parseJSON(response);
			 var elemsProccessed = misDatos.elements;
			 var elemsOnOff = misDatos.onOFF;
			 var elemsMessage = misDatos.message;

			 var iterations = elemsProccessed.length;
			 //SET RESPONSES

			 var generalResponseBody = '<h3 class="notificacion_bootbox">Notificación</h3>';
			 generalResponseBody += '<hr>';

			 for (var osd = 0; osd < iterations; osd++) {
			 //CHECK IMAGE
			 if (elemsOnOff[elemsProccessed[osd]] === 1) {
			 generalResponseBody += '<div class="alert alert-success" role="success">';
			 if (elemsProccessed[osd] === "uploadImage") {
			 generalResponseBody += '<h4>Imagen</h4>';
			 generalResponseBody += '<img class="uploaded" src="';
			 generalResponseBody += JSBase_url;
			 generalResponseBody += "uploads/cursos_image/";
			 generalResponseBody += elemsMessage[elemsProccessed[osd]].upload_data.file_name;
			 generalResponseBody += '" alt="upload" >';
			 } else {
			 generalResponseBody += elemsMessage[elemsProccessed[osd]];
			 }
			 generalResponseBody += '</div>';
			 } else {
			 generalResponseBody += '<div class="alert alert-danger" role="danger">';
			 if (elemsProccessed[osd] === "uploadImage") {
			 generalResponseBody += '<h4>Imagen</h4>';
			 generalResponseBody += elemsMessage[elemsProccessed[osd]].error;
			 } else {
			 generalResponseBody += elemsMessage[elemsProccessed[osd]];
			 }
			 generalResponseBody += '</div>';
			 }

			 }
			 generalResponseBody += '<hr>';

			 bootbox.alert(generalResponseBody);

			 setTimeout(function() {

			 //location.reload();

			 }, 2700);
			 $("#asociar-hash-btn").prop('disabled', false);
			 },
			 error : function(xhr) {// if error occured
			 alert("Ha sucedido un error: " + url);
			 $("#asociar-hash-btn").prop('disabled', false);
			 }
			 });
			
			}
		}
	});

});
function scrollToAnchor(aid) {
	var aTag = $(aid);
	$('html,body').animate({
		scrollTop : aTag.offset().top
	}, 'slow');
}
