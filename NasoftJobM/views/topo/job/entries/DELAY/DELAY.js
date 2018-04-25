Nasoft.Window.fns.DELAY=function(node){
				Nasoft.Ui_extend.browser_even('#DELAY');//限制组件不能超出浏览器上边缘
	
		    	var onBeforeOpen,onBeforeClose
		    	onBeforeOpen=function(){
		    		try {
		    			var nodeData = node.getEntry();
		    			$("#DELAY_jobname").textbox("setValue",node.text);
		    	    	$("#DELAY_maximumTimeout").textbox("setValue",nodeData.maximumTimeout?nodeData.maximumTimeout:"");   
		    	    	$("#DELAY_scaletime").combobox({
		    	    		onLoadSuccess : function(){
		    	    			$(this).combobox("select",nodeData.scaletime);
		    	    		}
		    	    	});
		    	    	$("#DELAY_ok").unbind("click").click(DELAY_ok);
		    	    	$("#DELAY_cancel").unbind("click").click(DELAY_cancel);
		    	    	function DELAY_ok(){
		    	    		node.text = $("#DELAY_jobname").textbox("getValue");
		    	    		nodeData.maximumTimeout =  parseInt($("#DELAY_maximumTimeout").textbox("getValue").trim());
		    	    		nodeData.scaletime = $("#DELAY_scaletime").combobox("getValue");
		    	    		
		    	    		$("#DELAY").window("close");
		    	    	}
		    	    	function DELAY_cancel(){
		    	    		$("#DELAY").window("close");
		    	    	}
		    			
					} catch (e) {
						// TODO: handle exception
						console.log(e)
					}
		    		
		    	};
		    	onBeforeClose=function(){
                 try {
						
					} catch (e) {
						// TODO: handle exception
						console.log(e)
					}
		    	}
		    	return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}