<template>
	<div class="NSet">
		<div class="source">
			<div class="sectionTitle">
				<div>Left Set</div>
				<div>Right Set</div>
			</div>
			<div class="sourceInputs">
				<textarea v-model="leftSet"/>
				<textarea v-model="rightSet"/>
			</div>
		</div>
		<div class="config">
			Item Separater
			<input class="configInput" v-model="separator">
			<div class="configRadios">
				<input
					type="radio"
					id="compareLeftOnly"
					name="compareType"
					value="leftOnly"
					v-model="comparisonType"
				>
				<label for="compareLeftOnly">Left Only</label>
				
				<input
					type="radio"
					id="compareRightOnly"
					name="compareType"
					value="rightOnly"
					v-model="comparisonType"
				>
				<label for="compareRightOnly">Right Only</label>
				
				<input
					type="radio"
					id="compareIntersect"
					name="compareType"
					value="intersect"
					v-model="comparisonType"
				>
				<label for="compareIntersect">Intersect</label>
				
				<input type="radio" id="compareUnion" name="compareType" value="union" v-model="comparisonType">
				<label for="compareUnion">Union</label>
				
				<input type="radio" id="compareXOR" name="compareType" value="xor" v-model="comparisonType">
				<label for="compareXOR">XOR</label>
			</div>
		</div>
		<div class="output">
			<div class="sectionTitle">Output</div>
			<textarea v-model="outputText"/>
		</div>
	</div>
</template>

<script>
export default {
	name: "NSet",
	components: {},
	props: {},
	data() {
		return {
			leftSet: "",
			rightSet: "",
			separator: "\\n",
			comparisonType: "intersect"
		};
	},
	computed: {
		_seperator: function() {
			return this.replaceNormalWithLiterals(this.separator);
		},
		outputText() {
			var output = "";
			let leftItems = this.leftSet.split(this._seperator);
			let rightItems = this.rightSet.split(this._seperator);

			switch (this.comparisonType) {
				case "leftOnly":
					output = this.leftSet;
					break;
				case "rightOnly":
					output = this.rightSet;
					break;
				case "intersect":
					output = Array.from(
						new Set(leftItems.filter(l => rightItems.includes(l)))
					).join(this._seperator);
					break;
				case "union":
					output = Array.from(
						new Set(leftItems.concat(rightItems))
					).join(this._seperator);
					break;
				case "xor":
					let arr = leftItems.concat(rightItems);
					arr = arr.filter(
						x => !(leftItems.includes(x) && rightItems.includes(x))
					);
					output = arr.join(this._seperator);
					break;
			}

			return output;
		}
	},
	methods: {
		replaceNormalWithLiterals(s) {
			return s.replace("\\n", "\n").replace("\\t", "\t");
		}
	}
};
</script>

<style scoped>
.NSet {
	display: flex;
	flex-direction: column;
	justify-content: center;

	background-color: rgb(160, 100, 220);
	padding: 10px;
	border-radius: 10px;
}
.NSet textarea {
	min-height: 200px;
	outline: none;
	border-radius: 10px;
	resize: none;
	font-size: 12pt;
	padding: 10px;
}
.source {
	display: flex;
	flex-direction: column;
}
.sectionTitle {
	font-size: 14pt;
	color: white;
	text-align: left;
	margin: 2px 12px 2px 12px;
	display: flex;
	justify-content: space-between;
}
.sourceInputs {
	display: flex;
}
.sourceInputs textarea {
	width: 100%;
	margin: 2px;
}
.config {
	display: flex;
	color: white;
	margin-top: 8px;
}
.configInput {
	margin-left: 8px;
	border-radius: 8px;
	outline: none;
	padding: 2px;
}
.output {
	display: flex;
	flex-direction: column;
}
.output textarea {
	margin: 2px;
}
</style>