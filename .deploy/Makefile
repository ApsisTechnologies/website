# EXAMPLE USAGE:
# make deploy AWS_PROFILE=rockin-prod BUCKET_NAME=rockindev-website-prod CLOUDFRONT_DIST_ID=E3N24OLNS13N75 ENV=prod

ENV=dev
SRC_DIR=$(PWD)/..
BUILD_DIR=.output/public

AWS_PROFILE=
AWS_REGION=us-east-1
AWS_CMD=aws --profile $(AWS_PROFILE) --region $(AWS_REGION)

BUCKET_NAME=
CLOUDFRONT_DIST_ID=
DISTRIBUTION_INVALIDATION_PATH=/*

CLOUDFRONT_CREATE_INVALIDATION_CMD=$(AWS_CMD) cloudfront create-invalidation \
	--distribution-id $(CLOUDFRONT_DIST_ID) \
	--paths "$(DISTRIBUTION_INVALIDATION_PATH)" \
	--query 'Invalidation.Id' \
	--output text

CLOUDFRONT_WAIT_INVALIDATION_CMD=$(AWS_CMD) cloudfront wait invalidation-completed --distribution-id $(CLOUDFRONT_DIST_ID) --id

validate:
ifndef AWS_PROFILE
	$(error AWS_PROFILE not defined)
endif
	@echo "AWS profile: $(AWS_PROFILE)"
ifndef BUCKET_NAME
	$(error BUCKET_NAME not defined)
endif
	@echo "Bucket name: $(BUCKET_NAME)"
ifndef CLOUDFRONT_DIST_ID
	$(error CLOUDFRONT_DIST_ID not defined)
endif
	@echo "CloudFront distribution id: $(CLOUDFRONT_DIST_ID)"

build:
	@echo "Building webapp..."
	@cd ..; yarn generate
	@rm $(SRC_DIR)/$(BUILD_DIR)/200.html
	@rm $(SRC_DIR)/$(BUILD_DIR)/404.html
	@cp $(SRC_DIR)/config/robots.$(ENV).txt $(SRC_DIR)/$(BUILD_DIR)/robots.txt

sync:
	@echo "Syncing build with bucket..."
	@cd ..; $(AWS_CMD) s3 sync $(BUILD_DIR) s3://$(BUCKET_NAME) --delete

invalidate:
	@echo "Invalidating CloudFront distribution..."
	@$(CLOUDFRONT_WAIT_INVALIDATION_CMD) $(shell $(CLOUDFRONT_CREATE_INVALIDATION_CMD))

deploy: validate build sync invalidate
	@echo "Website deployed successfully."

wait:
	@$(AWS_CMD) cloudfront wait invalidation-completed --distribution-id $(CLOUDFRONT_DIST_ID) --id $(INVALIDATION_ID)

print:
	@echo $(BUILD_DIR)
	@echo $(SRC_DIR)
	@echo $(ENV)
