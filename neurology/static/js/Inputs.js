function predictAAN() {

    async function load_model() {
        //let m = await tf.loadLayersModel('modelSigmoid.json')
        let m = await tf.loadLayersModel('../assets/modelANN.json')
        return m;
    }

    let model = load_model();

    model.then(function (res) {
        var AgePred = document.getElementById("Age").value;
        var SexPred = document.getElementById("Sex").value;
        var HeadachePred = document.getElementById("Headache").value;
        var DementiaPred = document.getElementById("Dementia").value;
        var GCSPred = document.getElementById("GCS").value;
        var MotorPred = document.getElementById("Motor_Weakness").value;
        var MidlinePred = document.getElementById("Midline_Shift").value;
        var CSDHPred = document.getElementById("CSDH_size").value;
        var QoLPred = document.getElementById("QoL").value;
        var AnticoagPred = document.getElementById("Anticoagulation").value;
        var prediction = res.predict(tf.tensor([[parseInt(AgePred),
            parseInt(SexPred), parseInt(HeadachePred), parseInt(DementiaPred),
            parseInt(GCSPred), parseInt(MotorPred), parseInt(MidlinePred),
            parseInt(CSDHPred), parseInt(QoLPred), parseInt(AnticoagPred)]]));


        document.getElementById("prediction").innerHTML = '<strong>Prediction: </strong>'+prediction;

        var d = document.getElementById("prediction").textContent;

        TensorVal = d.replace('<strong>Prediction: </strong>','');
        TensorVal = TensorVal.replaceAll('Prediction:','');
        TensorVal = TensorVal.replaceAll('Tensor','');
        TensorVal = TensorVal.replaceAll('[','');
        TensorVal = TensorVal.replaceAll(']','');
        TensorVal = TensorVal.replaceAll(',','');

        if(parseFloat(TensorVal) > 0.5) {
            decision = 'Accepted';
        } else {
            decision = 'Rejected';
        }
        

        document.getElementById("decision").innerHTML = '<strong>Decision: </strong>'+decision;
        
        $.post(siteroot+"/execute/", {  
            
            cmd:'Save Model Results',
            data: 'Age:'+AgePred+',Gender:'+SexPred+',Headache:'+HeadachePred+',Dementia:'+DementiaPred+',GCS:'+GCSPred+',Motor_Weakness:'+MotorPred+',Midline_Shift:'+MidlinePred+',CSDH_size:'+CSDHPred+',QoL:'+QoLPred+',Anticoagulation:'+AnticoagPred,
            decision:decision

        },function(data){
            
            $('#Predict').html('PREDICT');
            $('#Predict').attr('disabled',false);
            $('.modal').modal('show');
            
        });

    });
}


