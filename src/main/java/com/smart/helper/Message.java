package com.smart.helper;

public class Message {
	
	private String contents;
	private String type;
	
	public Message(String contents, String type) {
		super();
		this.contents = contents;
		this.type = type;
	}

	public String getContents() {
		return contents;
	}

	public void setContents(String contents) {
		this.contents = contents;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	

}
